/** @type {import('next').NextConfig} */

// The client needs the Supabase project URL + anon key, both of which are
// public by design (they ship to every browser). Only NEXT_PUBLIC_SUPABASE_ANON_KEY
// is defined as a NEXT_PUBLIC var in this project; the URL only exists as the
// server-side SUPABASE_URL. Bridge the server value to the public name (falling
// back to the BACKEND_ mirror) so the browser Supabase client initializes with
// the real project instead of a placeholder.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  process.env.BACKEND_NEXT_PUBLIC_SUPABASE_URL ||
  process.env.BACKEND_SUPABASE_URL ||
  ''
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.BACKEND_NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.BACKEND_SUPABASE_ANON_KEY ||
  ''

const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
