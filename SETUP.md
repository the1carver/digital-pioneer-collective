# Digital Pioneers - Setup

## 1) Environment variables
Copy `.env.local.example` to `.env.local` and fill in values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_SNAPSHOT_SPACE`
- `NEXT_PUBLIC_SAFE_ADDRESS`, `NEXT_PUBLIC_SAFE_CHAIN`
- `WEB3_STORAGE_TOKEN`
- `ANTHROPIC_API_KEY`

## 2) Supabase schema
Open Supabase SQL Editor and run the SQL from `supabase/schema.sql`.

### Assign yourself moderator role
Replace `<YOUR_USER_ID>` with your auth user id:

```sql
insert into public.roles(user_id, role) values ('<YOUR_USER_ID>', 'moderator')
on conflict(user_id, role) do nothing;
```

## 3) Install & run

```bash
pnpm install
pnpm dev
```

## 4) Smoke test
- Join → verify email → Login
- Create proposal → Draft with AI → Submit for review → Approve (Moderation) → Publish → Check Transparency
- Connect wallet → see address saved to profile
- Proposals page shows Snapshot proposals
- Dashboard shows Safe transactions

## 5) Deploy to Vercel

1. Create a new Vercel project and import this repo
2. Set Environment Variables (Project → Settings → Environment Variables):

| Name | Value |
|------|-------|
| NEXT_PUBLIC_SUPABASE_URL | from Supabase |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | from Supabase |
| SUPABASE_SERVICE_ROLE_KEY | from Supabase (Server only) |
| NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID | from WalletConnect Cloud |
| NEXT_PUBLIC_SNAPSHOT_SPACE | your Snapshot space (e.g., demo.eth) |
| NEXT_PUBLIC_SAFE_ADDRESS | Safe address |
| NEXT_PUBLIC_SAFE_CHAIN | polygon | base | mainnet |
| PINATA_JWT | Pinata JWT (pinJSONToIPFS) |
| ANTHROPIC_API_KEY | Anthropic API key |

3. Build & deploy

After deploy:
- Verify `/proposals`, `/moderation`, `/transparency`, `/dashboard`
- Ensure RLS works: unauthenticated users can only read published proposals


