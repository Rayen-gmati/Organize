# Schéma CMS Wix Data - Organize

## Collection `Leads`

| Clé du champ | Nom affiché | Type Wix Data | Requis | Valeur par défaut | 
|---|---|---|---|---|
| `name` | Nom | Text | Oui | - |
| `email` | E-mail | Text | Oui | - |
| `company` | Société | Text | Non | - |
| `companySize` | Taille de l’entreprise | Text | Non | - |
| `message` | Message | Text | Oui | - |
| `source` | Source | Text | Non | - |
| `status` | Statut | Text (enum) | Oui | `new` |
| `consent` | Consentement RGPD | Boolean | Oui | `false` |
| `consentAt` | Date/heure consentement | Date & Time | Non | - |
| `createdAt` | Date de création | Date & Time | Oui | Date système |

Permissions : lecture réservée au propriétaire du site ; insertion exclusivement côté backend via `wix-data.insert(..., { suppressAuth: true })` ; modification / suppression réservées au propriétaire. Aucun champ honeypot ajouté.

## Collection `Faq`

| Clé du champ | Nom affiché | Type Wix Data | Requis | Valeur par défaut |
|---|---|---|---|---|
| `question` | Question | Text | Oui | - |
| `answer` | Réponse | Rich Text / Text | Oui | - |
| `category` | Catégorie | Text | Oui | - |
| `order` | Ordre | Number | Non | `0` |
| `published` | Publiée | Boolean | Oui | `false` |

Permissions : lecture publique (lecture du site) ; insertion / modification / suppression réservées au propriétaire du site.

## Collection `Testimonials`

| Clé du champ | Nom affiché | Type Wix Data | Requis | Valeur par défaut |
|---|---|---|---|---|
| `author` | Auteur | Text | Oui | - |
| `role` | Fonction | Text | Oui | - |
| `company` | Entreprise | Text | Non | - |
| `quote` | Citation | Text | Oui | - |
| `rating` | Note | Number | Oui | `5` |
| `published` | Publié | Boolean | Oui | `false` |
| `order` | Ordre | Number | Non | `0` |

Permissions : lecture publique uniquement pour les éléments publiés ; insertion / modification / suppression réservées au propriétaire. Aucun témoignage publié ne doit être ajouté sans validation manuelle.

## Collection `Offers`

| Clé du champ | Nom affiché | Type Wix Data | Requis | Valeur par défaut |
|---|---|---|---|---|
| `title` | Titre | Text | Oui | - |
| `tier` | Niveau | Text | Oui | - |
| `summary` | Résumé | Text | Oui | - |
| `features` | Fonctionnalités | Text List | Oui | `[]` |
| `order` | Ordre | Number | Non | `0` |
| `published` | Publiée | Boolean | Oui | `false` |

Permissions : lecture publique pour les offres publiées ; insertion / modification / suppression réservées au propriétaire du site.

## Collection `TeamMembers`

| Clé du champ | Nom affiché | Type Wix Data | Requis | Valeur par défaut |
|---|---|---|---|---|
| `name` | Nom | Text | Oui | - |
| `role` | Rôle | Text | Oui | - |
| `bio` | Biographie | Text | Oui | - |
| `photo` | Photo | Image | Non | - |
| `order` | Ordre | Number | Non | `0` |

Permissions : lecture publique ; insertion / modification / suppression réservées au propriétaire du site.

## Collection `SiteSettings`

| Clé du champ | Nom affiché | Type Wix Data | Requis | Valeur par défaut |
|---|---|---|---|---|
| `contactEmail` | E-mail de contact | Text | Oui | - |
| `phone` | Téléphone | Text | Oui | - |
| `linkedinUrl` | URL LinkedIn | Text | Oui | - |

Permissions : lecture publique ; insertion / modification / suppression réservées au propriétaire du site.

## Procédure de création dans Wix Studio

1. Ouvrir l’onglet `Bases de données` dans Wix Studio.
2. Cliquer sur `+ Créer une collection` et créer les collections dans l’ordre suivant : `Leads`, `Faq`, `Testimonials`, `Offers`, `TeamMembers`, `SiteSettings`.
3. Pour chaque collection, créer les champs listés ci-dessus avec les noms exacts en `camelCase` et les types Wix Data demandés.
4. Sur les champs concernés, cocher `Obligatoire` uniquement si la colonne le précise.
5. Définir les valeurs par défaut indiquées dans le tableau, notamment : `Leads.status = new`, `Testimonials.published = false`, `Offers.published = false`, `Faq.published = false`.
6. Ouvrir `Paramètres` de la collection puis cocher les permissions :
   - `Leads` : lecture = `Owner only`; insertion = `No one` dans l’UI du site, mais l’écriture backend passe par `suppressAuth`; modification = `Owner`; suppression = `Owner`.
   - `Faq`, `Testimonials`, `Offers`, `TeamMembers`, `SiteSettings` : lecture = `Anyone`; insertion = `Owner`; modification = `Owner`; suppression = `Owner`.
7. Vérifier que les identifiants de collection correspondent exactement à `src/public/constants/collections.js` :
   - `Leads`
   - `Faq`
   - `Testimonials`
   - `Offers`
   - `TeamMembers`
   - `SiteSettings`
8. Enregistrer puis tester la création d’une première ligne de chaque collection avec le compte propriétaire pour valider la structure et les permissions.

## Fichiers de référence

- `src/public/constants/collections.js`
- `src/backend/data/*.js`
- `src/backend/seed/seed.web.js`
