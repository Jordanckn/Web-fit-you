# Spécification API — IA Playground

Base URL
- /api

Auth & Session
- Cookie sid (HttpOnly). Dev: fallback mémoire.

Endpoints
POST /auth/signup
- Body: { name, email, company?, sector, goal, consent: boolean }
- 400 si consent=false ou email invalide
- 200 { ok: true }
- Side-effects: créer user, OTP (6 chiffres), hash, attempts=0, expiresAt=+10min, mail user + admin

POST /auth/verify-otp
- Body: { email, code }
- 400 invalid
- 423 locked (cooldown remaining sec)
- 200 { ok: true, sid }

GET /auth/session
- Cookie sid
- 200 { verified: boolean, remainingGenerations: number }

POST /ia/ideas
- Cookie sid
- Body: { platform, brief, sector?, goal? }
- 401 si non vérifié
- 429 si quota épuisé ou rate limit
- 200 { ideas: [ { id, title, angle, value, cta, meta? } ] }

POST /ia/final
- Cookie sid
- Body: { platform, choice, brief, sector?, goal? }
- 200 { content, hashtags?, caption?, image?: { url?, prompt, ratio } }

Erreurs communes (JSON)
- { error: { code: 'VALIDATION_ERROR'|'RATE_LIMIT'|'LOCKED'|'UPSTREAM_ERROR', message } }
