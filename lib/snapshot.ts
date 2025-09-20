export interface SnapshotProposal {
  id: string
  title: string
  body: string
  state: string
  end: number
  start: number
  author: string
}

export async function fetchSnapshotProposals(space: string, state: 'active' | 'closed' | 'pending' = 'active') {
  const query = `
    query Proposals($space: String!, $state: String!) {
      proposals(first: 10, skip: 0, where: { space_in: [$space], state: $state }, orderBy: "end", orderDirection: desc) {
        id
        title
        body
        state
        end
        start
        author
      }
    }
  `

  const res = await fetch('https://hub.snapshot.org/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { space, state } })
  })
  const json = await res.json()
  return (json?.data?.proposals ?? []) as SnapshotProposal[]
}


