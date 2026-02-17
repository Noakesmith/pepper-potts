# Pepper Potts — Backend

Tim's personal infrastructure backend. The "pipes" that connect external services
to the Obsidian vault.

## What This Does

Pepper Potts is a lightweight Next.js app deployed on Vercel. It receives
webhooks from external services, processes the data, and commits it to the
Obsidian vault via the GitHub API.

## Current Features

### Email → Vault (Postmark)

- **Endpoint**: `POST /api/email?token=SECRET_KEY`
- **How it works**: Postmark receives an email → sends webhook → this endpoint
  converts HTML to markdown → commits to `Inbox/Clippings/` in the vault repo
- **Filename format**: `{subject} - {sender name}.md` to prevent overwrites

## Architecture

```
Email → Postmark → POST /api/email → GitHub API → Vault repo → obsidian-git pulls
```

## Environment Variables

See `.env.example` for required variables.

## Deployment

Deployed on Vercel. Push to `main` to deploy.

## Part of the Pepper-Potts Ecosystem

- **This repo**: Backend webhooks and integrations
- **Obsidian vault**: Commands, skills, ceremonies (the brain)
- **Coach Tools**: Coaching client management
- **Pindari**: Business ops and finances

## Future Endpoints

As Pepper-Potts grows, new webhooks and integrations will be added here:
- Health/wearable data ingestion
- Calendar sync
- Apple Shortcuts webhooks
