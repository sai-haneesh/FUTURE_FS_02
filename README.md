# FUTURE_FS_02 — Client Lead Management System (Mini CRM)

## Features
- Express REST API for creating, listing, updating, and deleting leads
- Search by contact name or email and filter by status
- Statuses: New, Contacted, Converted
- Notes and follow-up field
- Responsive admin-style dashboard
- Starter JSON data file for local demonstration

## Requirements
- Node.js 18+ recommended
- npm

## Run locally
1. Open a terminal in this folder.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000`.

## API endpoints
- `GET /api/leads` — list leads
- `POST /api/leads` — create a lead (`name`, `email`, optional `source`, `status`, `notes`)
- `PATCH /api/leads/:id` — update `status` and/or `notes`
- `DELETE /api/leads/:id` — delete a lead

## Important notes before submission
- This starter stores records in `data/leads.json`, not MongoDB/MySQL.
- The UI is a demo admin workspace, not production-secure authentication. Add proper authentication, authorization, validation, and a database if required by your evaluation.
- Test every CRUD operation and add screenshots to the repository.
- Do not expose private customer information in a public repository.

## Suggested repository
`FUTURE_FS_02`
