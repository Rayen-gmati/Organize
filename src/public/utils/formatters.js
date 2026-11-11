/**
 * Utilitaires de formatage.
 * Responsabilité : fonctions pures de formatage UI.
 */

/**
 * Normalise un nom complet pour affichage.
 * @param {string} fullName Nom brut.
 * @returns {string} Nom formaté.
 */
export function formatDisplayName(fullName) {
  if (!fullName) {
    return '';
  }

  return String(fullName)
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Formate un numéro de téléphone en version lisible.
 * @param {string} phone Téléphone brut.
 * @returns {string} Téléphone formaté.
 */
export function formatPhone(phone) {
  if (!phone) {
    return '';
  }

  return String(phone).replace(/\s+/g, ' ').trim();
}

/**
 * Convertit un texte de fonctionnalités séparé par des retours à la ligne en tableau.
 * @param {string|null|undefined} value Texte brut.
 * @returns {string[]} Tableau de fonctionnalités.
 */
export function featuresToArray(value) {
  if (!value) {
    return [];
  }

  return String(value)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Convertit un tableau de fonctionnalités en texte séparé par des retours à la ligne.
 * @param {string[]|null|undefined} value Tableau de fonctionnalités.
 * @returns {string} Texte brut.
 */
export function featuresToText(value) {
  if (!value) {
    return '';
  }

  return Array.isArray(value)
    ? value.map((item) => String(item).trim()).filter(Boolean).join('\n')
    : String(value).trim();
}
