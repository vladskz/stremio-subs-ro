# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Vercel (serverless) deployment support via `api/index.js` and `vercel.json`.
- `CHANGELOG.md`.

### Fixed

- API requests now use `https://subs.ro/api/v1.0` instead of `https://api.subs.ro/v1.0`.
  The old host is behind Cloudflare bot protection that blocks Vercel/cloud IPs,
  which caused API key validation and subtitle fetching to fail with HTTP 403.
- Subtitle proxy URLs now use the request host instead of a hardcoded BeamUp URL,
  so the addon works on any deployment.
- Removed a double slash in subs.ro API request URLs.

### Changed

- Rate limiter performs direct HTTP requests on serverless platforms (Vercel)
  instead of relying on a `setInterval` queue loop.
- `server.js` exports the Express app and only starts listening when run directly.

### Docs

- Added Vercel deployment instructions to `README.md`.
