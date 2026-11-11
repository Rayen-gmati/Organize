# Schéma CMS réel - Organize

## Collection `Leads`

| Clé | Type Wix Data | Requis | Remarques |
|---|---|---:|---|
| `name` | Text | Oui | Nom principal du contact. |
| `email` | Text | Oui | Adresse e-mail du contact. |
| `company` | Text | Non | Nom de l'entreprise. |
| `companySize` | Number | Non | Taille de l'entreprise, entier optionnel. |
| `message` | Text | Oui | Message du demandeur. |
| `source` | Text | Non | Source de provenance. |
| `status` | Text | Oui | Valeurs attendues : `new`, `contacted`, `closed`. |
| `consent` | Boolean | Oui | Consentement RGPD. |

## Collection `Faq`

| Clé | Type Wix Data | Requis | Remarques |
|---|---|---:|---|
| `question` | Text | Oui | Question affichée. |
| `answer` | Text | Oui | Réponse affichée. |
| `category` | Text | Oui | Catégorie de la FAQ. |
| `order` | Number | Non | Ordre d'affichage. |
| `published` | Boolean | Oui | Visibilité publique. |

## Collection `Offers`

| Clé | Type Wix Data | Requis | Remarques |
|---|---|---:|---|
| `tier` | Text | Oui | Nom de l'offre : `Audit`, `Centralisation`, `Automatisation`. |
| `summary` | Text | Oui | Résumé court. |
| `features` | Text | Oui | Un seul texte, items séparés par un retour à la ligne. |
| `order` | Number | Non | Ordre d'affichage. |
| `published` | Boolean | Oui | Visibilité publique. |

## Collection `TeamMembers`

| Clé | Type Wix Data | Requis | Remarques |
|---|---|---:|---|
| `name` | Text | Oui | Nom complet. |
| `role` | Text | Oui | Rôle affiché. |
| `biography` | Text | Oui | Biographie du membre. |
| `photo` | Image | Non | Photo du membre. |
| `order` | Number | Non | Ordre d'affichage. |

## Collection `Testimonials`

| Clé | Type Wix Data | Requis | Remarques |
|---|---|---:|---|
| `author` | Text | Oui | Auteur du témoignage. |
| `role` | Text | Oui | Rôle de l'auteur. |
| `company` | Text | Non | Entreprise de l'auteur. |
| `quote` | Text | Oui | Citation. |
| `rating` | Number | Oui | Note sur 5. |
| `order` | Number | Non | Ordre d'affichage. |
| `published` | Boolean | Oui | Visibilité publique ; aucun témoignage publié sans validation. |

## Collection `SiteSettings`

| Clé | Type Wix Data | Requis | Remarques |
|---|---|---:|---|
| `contactEmail` | Text | Oui | Email de contact principal. |
| `phoneNumber` | Text | Oui | Téléphone principal. |
| `linkedinUrl` | Text | Oui | URL LinkedIn. |
| `logoImage` | Image | Non | Logo du site. |
| `businessHours` | Text | Non | Horaires d'ouverture. |

## Écarts avec l’ancien schéma

1. `Leads` n’a ni `consentAt` ni `createdAt` ; le système `_createdDate` sert de date de création, et le consentement est géré par `consent`.
2. `Offers` n’a pas de champ `title` ; le libellé est dans `tier`.
3. `Offers.features` est un unique `Text`, pas une liste.
4. `TeamMembers.bio` devient `biography`.
5. `SiteSettings` utilise `phoneNumber`, `logoImage` et `businessHours`; `phone` est remplacé.

## Référence de validation Wix Studio

- Vérifier les noms exacts des champs dans l’éditeur Wix Data.
- Vérifier les types réels de chaque collection, surtout `companySize`, `features`, `logoImage` et `businessHours`.
- Ne pas ajouter de contenu publié sans validation propriétaire.
