/**
 * État de formulaire UI.
 * Responsabilité : gérer les transitions chargement / succès / erreur.
 */

/**
 * État initial d'un formulaire.
 * @returns {{status: 'idle'|'loading'|'success'|'error', message: string}} État initial.
 */
export function createInitialFormState() {
  // TODO: Retourner l'état initial du formulaire.
}

/**
 * Construit l'état d'un formulaire selon un statut cible.
 * @param {'loading'|'success'|'error'} status Statut cible.
 * @param {string} message Message associé.
 * @returns {{status: 'loading'|'success'|'error', message: string}} État dérivé.
 */
export function createFormState(status, message) {
  // TODO: Retourner un objet d'état standardisé.
}
