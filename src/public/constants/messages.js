/**
 * Messages utilisateur (FR).
 * Responsabilité : centraliser les messages d'interface et d'erreur.
 */

export const MESSAGES = {
  FORM: {
    LOADING: 'Envoi en cours…',
    SUCCESS: 'Merci, votre demande a bien été envoyée.',
    ERROR_GENERIC: 'Une erreur est survenue. Merci de réessayer.',
    ERROR_VALIDATION: 'Certains champs sont invalides.'
  },
  VALIDATION: {
    NAME_REQUIRED: 'Veuillez renseigner votre nom.',
    EMAIL_REQUIRED: 'Veuillez renseigner une adresse e-mail valide.',
    MESSAGE_REQUIRED: 'Veuillez renseigner votre message.',
    CONSENT_REQUIRED: 'Veuillez accepter le consentement avant l’envoi.',
    COMPANY_REQUIRED: 'Veuillez renseigner le nom de votre entreprise.',
    COMPANY_SIZE_REQUIRED: 'Veuillez renseigner une taille d’entreprise valide.'
  }
};

// TODO: Compléter les messages selon les écrans finaux.
