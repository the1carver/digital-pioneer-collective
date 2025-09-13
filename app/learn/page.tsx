export default function LearnPage() {
  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Learn: Getting Started</h1>
      <p className="text-muted-foreground mb-6">How to join, connect your wallet, vote, and our AI oversight policy.</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Create an account</h2>
          <p>Use the Join page to sign up. Confirm your email for full access.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">2. Connect a wallet</h2>
          <p>Use the Connect button in the header. Your address is saved to your profile.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">3. Proposals & voting</h2>
          <p>Create proposals on-site. Votes happen on Snapshot; connect your wallet to participate.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">4. Transparency</h2>
          <p>We log AI prompts/outputs with hashes and publish final docs to IPFS. See the Transparency page.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">5. Oversight policy</h2>
          <p>AI drafts content only. Human moderators approve or reject outputs. Treasury is controlled by a multi‑sig.</p>
        </section>
      </div>
    </div>
  )
}


