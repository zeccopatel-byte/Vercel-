// Vercel serverless function: POST /api/contact
// 1. Validates the enquiry
// 2. Saves it to the Supabase table `enquiries`
// 3. Emails it to Dr. Singh through Resend
//
// Environment variables (Vercel > Settings > Environment Variables):
//   SUPABASE_URL               e.g. https://abcd1234.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  Supabase > Project Settings > API > service_role key (keep secret)
//   RESEND_API_KEY             resend.com > API Keys
//   CONTACT_TO                 optional, defaults to shwetasingh.faculty@gmail.com
//   CONTACT_FROM               optional, defaults to "Website <onboarding@resend.dev>"

const TYPES = [
  'Speaking', 'Policy and advisory', 'Research collaboration', 'Media and op-eds',
  'Workshops and training', 'Coaching and mediation', 'Students', 'Other'
];
const EMAIL_RE = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Use POST.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  // Honeypot: bots fill the hidden field. Pretend success, store nothing.
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  const data = {
    enquiry_type: clean(body.type, 60),
    name: clean(body.name, 80),
    email: clean(body.email, 120).toLowerCase(),
    organisation: clean(body.organisation, 120) || null,
    event_date: clean(body.eventDate, 10) || null,
    message: clean(body.message, 2000),
    consent: body.consent === true
  };

  const errors = {};
  if (!TYPES.includes(data.enquiry_type)) errors.type = 'Choose what your enquiry is about.';
  if (data.name.length < 2) errors.name = 'Enter your name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Enter a valid email address.';
  if (data.message.length < 20) errors.message = 'Write at least 20 characters.';
  if (data.event_date && !/^\d{4}-\d{2}-\d{2}$/.test(data.event_date)) errors.eventDate = 'Enter a valid date.';
  if (!data.consent) errors.consent = 'Consent is required so she can reply.';
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.CONTACT_TO || 'shwetasingh.faculty@gmail.com';
  const FROM = process.env.CONTACT_FROM || 'Website <onboarding@resend.dev>';

  if (!SUPABASE_URL || !SUPABASE_KEY || !RESEND_KEY) {
    return res.status(500).json({ ok: false, error: 'The contact form is not configured yet.' });
  }

  // 1. Save to Supabase
  let saved = false;
  try {
    const r = await fetch(SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/enquiries', {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        ...data,
        user_agent: clean(req.headers['user-agent'], 300) || null
      })
    });
    saved = r.ok;
    if (!r.ok) console.error('Supabase insert failed', r.status, await r.text());
  } catch (e) {
    console.error('Supabase insert error', e);
  }

  // 2. Email Dr. Singh
  const rows = [
    ['Enquiry type', data.enquiry_type],
    ['Name', data.name],
    ['Email', data.email],
    ['Organisation', data.organisation || '-'],
    ['Event date', data.event_date || '-']
  ];
  const html =
    '<div style="font-family:Arial,sans-serif;color:#26113D;max-width:600px">' +
    '<h2 style="margin:0 0 16px">New website enquiry: ' + esc(data.enquiry_type) + '</h2>' +
    '<table style="border-collapse:collapse;width:100%">' +
    rows.map(function (r) {
      return '<tr><td style="padding:6px 12px 6px 0;color:#56506A;white-space:nowrap">' + r[0] +
        '</td><td style="padding:6px 0">' + esc(r[1]) + '</td></tr>';
    }).join('') +
    '</table><h3 style="margin:20px 0 8px">Message</h3>' +
    '<p style="white-space:pre-wrap;line-height:1.6;margin:0">' + esc(data.message) + '</p>' +
    '<p style="color:#56506A;font-size:12px;margin-top:24px">Reply to this email to answer ' + esc(data.name) + ' directly.</p></div>';
  const text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n') + '\n\nMessage:\n' + data.message;

  let emailed = false;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + RESEND_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: data.email,
        subject: 'Website enquiry: ' + data.enquiry_type + ' from ' + data.name,
        html: html,
        text: text
      })
    });
    emailed = r.ok;
    if (!r.ok) console.error('Resend failed', r.status, await r.text());
  } catch (e) {
    console.error('Resend error', e);
  }

  if (!saved && !emailed) {
    return res.status(502).json({ ok: false, error: 'We could not send your enquiry. Please try again or email directly.' });
  }
  return res.status(200).json({ ok: true, saved: saved, emailed: emailed });
};
