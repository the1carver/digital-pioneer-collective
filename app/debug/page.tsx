"use client"

export default function DebugPage() {
  const envs = {
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY': process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? 'SET' : 'MISSING',
    'NODE_ENV': process.env.NODE_ENV
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl mb-4">Environment Debug</h1>
      <div className="space-y-2">
        {Object.entries(envs).map(([key, value]) => (
          <div key={key} className="flex gap-4">
            <span className="font-mono w-80">{key}:</span>
            <span className={value === 'MISSING' ? 'text-red-400' : 'text-green-400'}>
              {value || 'MISSING'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-800 rounded">
        <h2 className="text-lg mb-2">Quick Fix:</h2>
        <p>1. Go to Vercel → Settings → Environment Variables</p>
        <p>2. Add these for Production:</p>
        <div className="mt-2 font-mono text-sm">
          <div>NEXT_PUBLIC_SUPABASE_URL = https://kadumzoekqhvafisfnje.supabase.co</div>
          <div>NEXT_PUBLIC_SUPABASE_ANON_KEY = [your anon key]</div>
        </div>
        <p>3. Redeploy</p>
      </div>
    </div>
  )
}
