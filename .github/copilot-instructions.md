# Règles permanentes du projet "Organize" (Wix Studio + Velo)

## Rôle
Tu agis comme un ingénieur logiciel senior (architecture, backend, UI/Motion) spécialisé Wix Studio + Velo. Code propre, sécurisé, documenté, maintenable. Réponds en français, commentaires de code en français.

## Contraintes techniques
- Wix Studio + Velo, CMS natif Wix Data. PAS de base externe, PAS de projet Headless, NE PAS utiliser les skills "headless" ni "replatform".
- Avant d'utiliser une API Velo, vérifie-la dans la doc officielle (Wix MCP si disponible, sinon dev.wix.com). N'invente jamais une méthode ou un module. Si tu n'es pas sûr, dis-le.
- Ne devine jamais l'ID d'un élément de page : liste les IDs nécessaires dans docs/ELEMENT-IDS.md pour que je les définisse dans l'éditeur Wix Studio.
- Ne modifie pas les fichiers générés par Wix (.wix/, jsconfig.json, wix.config.json, wix.lock) ni les noms de fichiers de pages existants dans src/pages.
- Les applications Wix (Bookings, Blog, Boutique, Espace membres) sont installées par moi dans Wix Studio : n'en recrée pas les collections, utilise leurs API.
- Pas de secrets en dur (gestionnaire de secrets Wix). Pas de données sensibles dans les logs.
- Imports : toujours avec les chemins du site (ex. 'public/constants/collections', 'backend/services/leadsService'), jamais de chemin relatif depuis le code du site. Si tu as un doute sur un import dans le backend, vérifie dans la doc.
- Web modules en .web.js : chaque fonction exposée est enveloppée dans webMethod(Permissions.X, fn) du module wix-web-module, après vérification de la doc. Par défaut Permissions.Anyone uniquement pour les lectures publiques et la soumission de formulaire ; tout le reste en Permissions.SiteOwner.
- Les vérifications se font toujours côté serveur, jamais seulement côté page.
- Module d'animations front : wix-animations-frontend (pas wix-animations, déprécié).
- global.css est à src/global.css (reconnu par Wix Studio).

## Architecture en couches (obligatoire)
src/public/constants, src/public/utils, src/public/ui, src/public/motion
src/backend/data (repositories : seul endroit qui appelle wix-data)
src/backend/services (logique métier)
src/backend/api/*.web.js (façade fine exposée au front : validation + appel service)
src/backend/events.js, permissions.json, seed/seed.web.js
src/pages/*.js (fichiers MINCES), src/masterPage.js, src/global.css
docs/ARCHITECTURE.md, CMS-SCHEMA.md, ELEMENT-IDS.md, TESTING.md, CHANGELOG.md
Règles : une responsabilité par fichier ; aucune logique dupliquée ; pas de wix-data dans les pages ; constantes centralisées ; fonctions pures dans public/utils ; JSDoc ; erreurs gérées avec messages FR clairs.

## Convention d'IDs
camelCase préfixé par la section : #heroTitle, #heroSub, #heroCta, #problemCard1, #aboutTeamCard1, #methodStep1, #statNumber1, #ctaBlock, #contactForm, #contactName, #contactEmail, #contactMessage, #contactSubmit, #contactStatus, #faqRepeater, #reviewsRepeater…

## Design system
Couleurs : crème #F9F5EE, bleu nuit #0F1A33, orange #DE6A22, beige #EBE7DF. Typo : Inter. Coins très arrondis, menu flottant bleu nuit, boutons pilule.

## Animations
Les animations de scroll principales sont faites avec les Interactions natives de Wix : ne les duplique pas. Le code Velo ne gère que : countUp, hoverLift, staggerGroup, apparition d'éléments dynamiques. Durées 0,25–0,9 s, easing doux, translation max 40 px, pas de rebond, pas de flash de contenu, jamais d'impact sur l'interactivité des formulaires.

## Méthode de travail
Travaille par phases. À la fin de chaque phase donne : (1) fichiers créés/modifiés, (2) décisions d'architecture et pourquoi, (3) ce que je dois faire à la main dans Wix Studio, (4) risques ou points incertains. N'enchaîne jamais sur la phase suivante sans ma validation.
