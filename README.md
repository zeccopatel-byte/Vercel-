# Dr. Shweta Singh website

Static site (`index.html`) plus one Vercel serverless function for the contact form.

## Contact form setup

1. **Supabase**: create a project, open SQL Editor and run `supabase/schema.sql`.
2. **Resend**: create an account at resend.com and an API key.
3. **Vercel** > Project > Settings > Environment Variables, add for Production (and Preview):
   - `SUPABASE_URL` (Supabase > Project Settings > API > Project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` (same page, `service_role` secret key)
   - `RESEND_API_KEY`
   - optional `CONTACT_FROM`, e.g. `Dr. Shweta Singh <hello@shwetasingh.co>` once the domain is verified in Resend
4. Redeploy. Enquiries are saved in the `enquiries` table and emailed to shwetasingh.faculty@gmail.com.
