# Design system — AI Playground

*Lien Figma* : <https://www.figma.com/file/placeholder/AI-Playground>

## Couleurs principales
| Nom | Valeur | Usage |
|-----|--------|-------|
| `primary` | `#0EA5E9` | Actions, liens, accent principal |
| `secondary` | `#8B5CF6` | Survols, éléments interactifs |
| `background` | `#0F172A` | Fond général (mode sombre) |
| `surface` | `rgba(255,255,255,0.05)` | Cartes, panneaux (glassmorphism) |
| `text-primary` | `#F8FAFC` | Titres et texte important |
| `text-secondary` | `#CBD5E1` | Texte secondaire |

## Typographie
- Police principale : **Inter**, 16px de base
- Titres : poids 600–700
- Texte : poids 400–500

## Rythme et composants
- Grille 8px
- Coins arrondis 16px
- Ombres douces `0 4px 24px rgba(0,0,0,0.2)`

### Composants clés
- **Header** : titre, sous-titre, CTA primaire.
- **Sélecteur de plateforme** : contrôle segmenté avec icônes (Instagram, LinkedIn, TikTok, X/Twitter, Facebook).
- **Cartes d'idées** : surface translucide, animée au survol (scale 1.02).
- **Éditeur** : onglets "Texte" et "Image", boutons régénérer.
- **Prévisualisation** : mockups natifs de chaque réseau social.
- **Cadres latéraux** : frames iPhone avec carrousel auto-scroll (pause on hover).

## Mouvements & interactions
- Transitions 200ms `ease-out`.
- Parallaxe douce sur le fond (Framer Motion, `y` 20px).
- Carrousel GPU (`translate3d`).
- Focus visible `outline outline-2 outline-primary`.

## Accessibilité
- Contraste AA minimum 4.5:1.
- Navigation clavier complète, `aria-label` sur les icônes.
- Support des tailles de police système et `prefers-reduced-motion`.
