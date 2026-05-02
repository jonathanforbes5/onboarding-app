import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHmac, randomInt } from 'crypto';
import { Resend } from 'resend';

const RESEND_KEY   = process.env.RESEND_API_KEY;
const OTP_SECRET   = process.env.OTP_SECRET ?? 'ri-otp-fallback-secret-change-me';
const OTP_TTL_MS   = 10 * 60 * 1000; // 10 minutes

function signToken(userKey: string, otp: string, exp: number): string {
  const payload = `${userKey}:${otp}:${exp}`;
  const sig = createHmac('sha256', OTP_SECRET).update(payload).digest('hex');
  return Buffer.from(JSON.stringify({ userKey, exp, sig })).toString('base64url');
}

export async function POST(req: NextRequest) {
  const { name } = await req.json() as { name: string };
  const userKey = name?.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
  if (!userKey) return NextResponse.json({ error: 'name required' }, { status: 400 });

  // Verify user exists using anon key
  const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!anonKey || !supabaseUrl) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  const client = createClient(supabaseUrl, anonKey);
  const { data: user } = await client
    .from('allowed_users')
    .select('email, display_name')
    .eq('user_key', userKey)
    .maybeSingle();

  if (!user) return NextResponse.json({ error: 'user not found' }, { status: 404 });

  if (!RESEND_KEY) {
    return NextResponse.json({ error: 'Email service not configured — contact Jonathan' }, { status: 503 });
  }

  const otp = String(randomInt(100000, 999999));
  const exp = Date.now() + OTP_TTL_MS;
  const token = signToken(userKey, otp, exp);

  const resend = new Resend(RESEND_KEY);
  // Use Resend's shared test domain until roofignite.com is verified as a sending domain
  const fromDomain = process.env.RESEND_FROM_EMAIL ?? 'Roof Ignite <onboarding@resend.dev>';
  const { error: emailError } = await resend.emails.send({
    from: fromDomain,
    to: user.email,
    subject: `Your Roof Ignite login code: ${otp}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0A0A0A;color:#F5F5F5;border-radius:16px">
        <img src="https://onboarding.roofignite.com/logo.png" alt="Roof Ignite" style="height:40px;margin-bottom:24px" />
        <h2 style="color:#F5C800;font-size:20px;font-weight:900;margin:0 0 8px">Your login code</h2>
        <p style="color:#888;font-size:14px;margin:0 0 24px">Hi ${user.display_name}, here's your one-time passcode:</p>
        <div style="background:#1A1A00;border:2px solid #F5C800;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
          <div style="color:#F5C800;font-size:40px;font-weight:900;letter-spacing:0.15em">${otp}</div>
          <div style="color:#888;font-size:12px;margin-top:8px">Expires in 10 minutes</div>
        </div>
        <p style="color:#555;font-size:12px;margin:0">If you didn't request this, ignore this email. Only you should have access to the Roof Ignite portal.</p>
      </div>
    `,
  });

  if (emailError) {
    return NextResponse.json({ error: 'Failed to send email — try again or contact Jonathan' }, { status: 500 });
  }

  const maskedEmail = user.email.replace(/^(.)(.*)(@.*)$/, (_: string, a: string, _b: string, c: string) => a + '***' + c);
  return NextResponse.json({ token, email: maskedEmail });
}
