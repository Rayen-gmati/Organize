/**
 * Utilitaires de validation.
 * Responsabilité : fonctions pures de validation côté front.
 */

/**
 * Vérifie qu'une valeur texte est non vide.
 * @param {string} value Valeur à vérifier.
 * @returns {boolean} True si la valeur est valide.
 */
export function isNonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Vérifie un format email basique.
 * @param {string} value Email à vérifier.
 * @returns {boolean} True si le format est valide.
 */
export function isEmail(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const email = value.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
