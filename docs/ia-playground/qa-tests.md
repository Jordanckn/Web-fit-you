# Plan de tests QA & critères d’acceptation

Cas OTP
- Saisie correcte 1er essai => succès, session créée
- 2 échecs + 1 succès => débloque, attempts reset
- 3 échecs => LOCKED 15 min, rejet avant expiration, succès après
- Rate limiting bruteforce => 429

Cas IA
- Idées: succès, JSON parse
- Idées: JSON invalide => fallback message
- Final: succès
- Timeout / 5xx OpenRouter => message utilisateur avec “Réessayer”

UI/Accessibilité
- Responsive <375px, 768px, 1024px, 1440px
- Contraste AA (applitools/axe)
- Navigation clavier dans le modal (focus trap, aria-modal)
- Formulaire: erreurs champ par champ (email, consent obligatoire)

Quotas
- Générer idées puis final = 1 crédit consommé
- 3 crédits/ session => blocage UI, message clair

Critères d’acceptation
- Flux complet fonctionne (démo)
- Erreurs FR claires, loaders visibles
- Aucune clé API exposée côté client
