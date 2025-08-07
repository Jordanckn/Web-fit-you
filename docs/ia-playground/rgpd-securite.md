# Plan sécurité & conformité RGPD

Sécurité
- Clé OpenRouter uniquement côté serveur, endpoints proxy.
- Cookies HttpOnly, SameSite=Lax, Secure en production.
- Rate limiting par IP/email/sid pour OTP et IA.
- Hash OTP (SHA-256 + salt), durée de vie 10 min, purge.
- CORS: origin de prod uniquement.
- Validation input (zod/yup server), longueur max brief 800 chars.
- Logs: pas de données sensibles (OTP en clair, contenus privés).

RGPD
- Consentement (case à cocher obligatoire) + lien Politique de confidentialité.
- Minimisation: stocker seulement nécessaire (nom, email, entreprise, secteur, objectif, consentAt, verified).
- Droit d’accès/suppression: contact unique webfityou@gmail.com, process manuel initial.
- Rétention: OTP 24h max, logs IA 30 jours, utilisateurs tests 12 mois (configurable).
- Registre de traitements: finalité “démonstration générateurs IA”.
