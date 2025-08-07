# Plan de mise en œuvre — AI Playground

## Jalons (3 semaines)

### Semaine 1 – Design & préparation
- Valider la direction artistique et les tokens dans Figma (couleurs, typo, composants).
- Prototyper les écrans clés : sélection plateforme, idéation, éditeur, preview.
- Définir les prompts et l'API contract (ce dépôt).
- Installer la base technique (routes Next/Express, i18n, télémetrie).

### Semaine 2 – Développement front & back
- Implémenter l'interface responsive avec animations Framer Motion.
- Intégrer la sélection plateforme et le flux idées -> contenu.
- Brancher l'API OpenAI/OpenRouter et la génération d'images (Stable Diffusion / DALL·E).
- Gérer l'OTP, les sessions et le cache 24h (Redis ou mémoire).

### Semaine 3 – Finitions & QA
- Ajouter micro-interactions, états d'erreur, accessibilité AA.
- Optimiser performances (LCP <2.5s, CLS <0.1, bundle <200KB au-dessus de la ligne de flottaison).
- Écrire les tests QA et automatiser lint/build.
- Préparer démo publique et documentation finale.

## Risques & atténuations
- **Temps de génération élevé** : mettre en place streaming et cache ; surveiller la latence.
- **Coûts IA** : tracer l'utilisation par plateforme, appliquer quotas.
- **Complexité UI mobile** : prototyper tôt, tester sur appareils réels.
- **Sécurité** : valider les entrées via Zod, stocker les clés côté serveur uniquement.

## Dépendances
- GPT-4o ou équivalent via OpenRouter.
- Service d'images (Stable Diffusion / DALL·E + fallback stock).
- Redis (cache & rate limit).

## Livrables finaux
- Code source front/back.
- Figma mis à jour.
- OpenAPI & prompts (docs/ia-playground).
- URL de démo et guide de test.
