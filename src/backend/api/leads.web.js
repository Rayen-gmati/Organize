/**
 * Web module Leads.
 * Responsabilité : façade backend pour les demandes de contact et d'audit.
 */

/**
 * Endpoint web pour la demande de contact.
 * @param {Object} payload Données brutes reçues du front.
 * @returns {Promise<Object>} Réponse standardisée.
 */
export async function submitContactLead(payload) {
  // TODO: Valider le payload puis appeler le service leads.
}

/**
 * Endpoint web pour la demande d'audit.
 * @param {Object} payload Données brutes reçues du front.
 * @returns {Promise<Object>} Réponse standardisée.
 */
export async function submitAuditLead(payload) {
  // TODO: Valider le payload puis appeler le service leads.
}
