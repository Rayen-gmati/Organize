# Changelog

## 2026-11-10 — Phase 1 (Architecture)
- Création de l'ossature en couches backend/public selon les règles du projet.
- Ajout des squelettes de repositories par collection (`Leads`, `Faq`, `Testimonials`, `Offers`, `TeamMembers`, `SiteSettings`).
- Ajout des services (`leadsService`, `contentService`) et des web modules (`leads.web.js`, `content.web.js`).
- Ajout des squelettes d'animations/motion, utilitaires, constantes et état de formulaire.
- Ajout de `src/backend/events.js`, `src/backend/seed/seed.web.js`.
- Ajout de `src/global.css` avec variables design system et focus visible.
- Ajout de la documentation d'architecture (`docs/ARCHITECTURE.md`).

## 2026-11-24 — Phase 2 (Backend)
- Implémentation des validateurs `isNonEmpty()` et `isEmail()`.
- Ajout des messages de validation centralisés pour les formulaires.
- Implémentation du service Leads pour les demandes de contact et d'audit.
- Implémentation des web methods publiques Leads avec `wix-web-module`.
- Implémentation du contenu public Accueil via les repositories Offers, Faq, Testimonials et SiteSettings.
- Mise à jour des permissions des web modules pour les soumissions publiques, la lecture publique et le seed propriétaire.
