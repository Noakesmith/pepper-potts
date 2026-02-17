const owner = process.env.GITHUB_USERNAME!
const repo = process.env.GITHUB_REPO!
const token = process.env.GITHUB_ACCESS_TOKEN!
const inboxPath = process.env.OBSIDIAN_INBOX_PATH || ''

function toBase64(str: string): string {
  return Buffer.from(str).toString('base64')
}

export function sanitizeFilename(filename: string): string {
  let sanitized = filename.replace(/^(?:Fwd:|FWD:|RE:|Re:)\s*/i, '')

  sanitized = sanitized
    .replace(/[/\\:*?"<>|]/g, '')
    .replace(/\.+$/g, '')
    .trim()

  return sanitized
}

export async function commitFileToVault({
  filename,
  content,
  folder = '',
}: {
  filename: string
  content: string
  folder?: string
}) {
  let filePath = inboxPath

  if (folder) {
    filePath += folder.startsWith('/') ? folder : `/${folder}`
  }

  filePath += `/${filename}`

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(filePath)}`
  const base64Content = toBase64(content)

  // Check if the file already exists
  const checkResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })

  let sha = ''
  if (checkResponse.status === 200) {
    const data = await checkResponse.json()
    sha = data.sha
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Add or update ${filename}`,
      content: base64Content,
      sha: sha || undefined,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GitHub API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  return data.content.sha
}
