# Spécification fonctionnelle — Page “Testez nos IA”

Résumé
- Objectif: permettre de tester des générateurs IA (LinkedIn, Instagram, Facebook, Images) sous condition d’inscription + OTP (3 essais, cooldown 15 min), via une UI moderne (dark, néon, accessibilité AA).
- Portée: page frontend, flux UX, prompts serveur, endpoints backend, sécurité, RGPD, QA.

1) UI/UX — Page et composants
A. Header
- Titre: “Testez nos IA”
- Sous-titre: “Générez des idées et contenus prêts à publier”
- CTA: “Se connecter / S’inscrire” (ouvre panneau/section inscription si non validé)

B. Section Onglets (LinkedIn | Instagram | Facebook | Images)
- Chaque onglet:
  - Description du format
  - Bouton “Générer”
  - Si non validé: info “Accès restreint — activez par code (3 essais)”
  - Palette IA: dégradés néon (bleu/indigo/teal), fond dark, contraste AA

C. Panneau Inscription + OTP
- Formulaire: nom, email, entreprise, secteur, objectif marketing, consentement RGPD (checkbox), lien Politique de confidentialité.
- Submit: /api/auth/signup (envoie email admin, crée OTP hash, BCC admin).
- Écran OTP: champ code 6 chiffres, compteur d’essais restants, message d’erreur clair, blocage après 3 échecs 15 minutes.
- Accessibilité: labels, aria-invalid, messages de status.

D. Modal Chat Générateur
- Ouverture: “Générer pour [Plateforme]”
- Étapes:
  1. Saisie “Thème/brief” (+ rappel contraintes)
  2. IA propose 3 idées (cartes avec “Choisir”, “Regénérer”)
  3. Après choix: génération du contenu final
  4. Actions: Copier, Télécharger (.txt/.md), Envoyer par email (mailto admin+user)
- États: Chargement (squelettes), erreurs (timeouts, rate-limit), quotas (3 générations/session)

E. Compteurs et limites
- 1 session par utilisateur validé (cookie/sid)
- 3 générations complètes max/session
- Affichage compteur: “2/3 générations utilisées”

2) Prompts IA (background — côté serveur)
Système commun
“Tu es Horizon, un assistant expert en copywriting social media et SEO. Respecte strictement les contraintes de la plateforme, propose 3 idées initiales concises puis un contenu final prêt à publier, structuré, clair, sans jargon inutile. Langue: identique à la requête. Ton: professionnel, engageant, adapté à l’audience. Si le brief est insuffisant, pose 3 questions ciblées avant de générer.”

LinkedIn
Sortie 1: 3 idées d’articles LinkedIn avec titres accrocheurs, angle, valeur pour le lecteur, CTA. Contexte: {secteur}, {objectif}, audience B2B.
Sortie 2: Post final 150–250 mots, hook fort, 3–5 points structurés, insight/donnée, 3 hashtags pertinents, CTA. Variante courte 80–120 mots si demandé.

Instagram
Sortie 1: 3 idées de posts: concept visuel, angle, micro-CTA. Contexte: {secteur}, {objectif}, audience B2C.
Sortie 2: Légende 100–150 mots, ton dynamique, 3–5 emojis contextuels, 5–8 hashtags longue traîne, 1 CTA, format visuel recommandé (carrousel/reel/image).

Facebook
Sortie 1: 3 idées: bénéfice clair et angle conversationnel. Contexte: {secteur}, {objectif}, audience locale/communautaire.
Sortie 2: Post 80–140 mots, ton convivial, question d’engagement, 2–4 hashtags, CTA local.

Images
Sortie 1: 3 concepts d’images: description, style, palette, cadrage. Contexte: {secteur}, {objectif}, {plateforme}.
Sortie 2: Prompt image détaillé (sujet, style, lumière, composition, ambiance, résolution, ratio LinkedIn 1200x627 | Instagram 1080x1350 | Facebook 1200x630). Fournir 1 image par défaut (placeholder ici, génération réelle à brancher).

3) Backend — Endpoints et schémas
Env vars (server)
- OPENROUTER_API_KEY: sk-or-… (NE PAS exposer côté client)
- ADMIN_EMAIL: webfityou@gmail.com

Endpoints
POST /api/auth/signup
- Body: { name, email, company, sector, goal, consent: boolean }
- Actions: valider input, créer user (id, email), générer OTP (6 chiffres), hasher, stocker {hash, expiresAt, attempts=0, lockedUntil?}, envoyer email OTP à user + BCC admin, envoyer récap admin.
- Returns: { ok: true }

POST /api/auth/verify-otp
- Body: { email, code }
- Actions: rate-limit IP/email, vérifier blocage (lockedUntil), comparer hash, +1 attempt si échec, si attempts>=3 => lockedUntil=now+15min, si succès => mark verified=true, créer session (sid).
- Returns: { ok: true, sid }

GET /api/auth/session
- Cookie sid => renvoie état { verified: boolean, remainingGenerations }

POST /api/ia/ideas
- Auth: sid required, check quota
- Body: { platform: 'linkedin'|'instagram'|'facebook'|'image', brief, sector, goal }
- Compose prompt (système + plateforme), appeler OpenRouter (proxy), retourner 3 idées JSON normalisées.
- Decrémenter quota partiel (compte “idées + contenu” uniquement à la fin; sinon option: compter 0.5 à l’idée)

POST /api/ia/final
- Auth: sid required, check quota
- Body: { platform, choice, brief, sector, goal }
- Génère contenu final prêt à publier (et prompt image détaillé si ‘image’). Décrémenter quota (1).

Data Schemas (TypeScript)
User: { id, email, name, company?, sector?, goal?, consentAt, verified: boolean }
OTP: { userId, hash, attempts, expiresAt, lockedUntil? }
Session: { sid, userId, remainingGenerations, createdAt, expiresAt }
IARequestLog: { userId, sid, platform, stage: 'ideas'|'final', ts, ok, tokens? }

Stockage
- In-memory/SQLite/libsql en dev (WebContainer: pas de binaire natif, préférer in-memory ou localStorage fallback côté client pour la démo).
- Production: base (PostgreSQL/MySQL/SQLite) + Redis pour rate limit.

4) Sécurité
- Ne jamais exposer la clé OpenRouter au client; passer par /api/ia/* proxy.
- Rate limiting OTP et IA (IP, email, sid).
- Validation stricte des inputs (length, format, XSS).
- Cookies sid HttpOnly/SameSite=Lax, HTTPS en prod.
- CORS restreint domaine.
- Journaux minimalistes (pas d’OTP en clair).
- Hash OTP (ex: SHA-256 + salt).
- Cooldown 15 min après 3 échecs.

5) RGPD
- Consentement explicite (checkbox obligatoire).
- Politique de confidentialité (lien), droits d’accès/suppression (contact: webfityou@gmail.com).
- Minimisation: stocker seulement email, nom, entreprise (optionnel), secteur, objectif, consentAt, statut.
- Rétention OTP courte (<= 24h) puis purge.
- Export/suppression sur demande.

6) Plan de test (QA)
OTP
- Succès 1er essai
- 2 échecs puis succès
- 3 échecs => lock 15 min, avant et après expiration
- Tentatives rapides => rate limit 429

IA
- Succès idées
- Timeout (simuler) => message fallback
- Rate limit OpenRouter => message clair
- JSON inattendu => parse fallback

UI
- Responsive mobile/desktop
- Contraste AA
- Navigation clavier/modal focus trap
- Form validation (consent, email), erreurs en FR

Critères d’acceptation
- Flux complet opérationnel (démo): inscription -> OTP (3 essais max) -> génération idées -> génération contenu -> actions copier/télécharger
- Aucune fuite clé API côté client
- Textes FR, erreurs claires, loaders visibles
