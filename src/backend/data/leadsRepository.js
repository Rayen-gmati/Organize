/**
 * Repository Leads.
 * Responsabilité : centraliser les opérations de persistance pour la collection Leads.
 */

/**
 * Crée un lead dans la collection Leads.
 * @param {Object} payload Données validées du lead.
 * @returns {Promise<Object>} Lead créé.
 */
export async function createLead(payload) {
  // TODO: Implémenter l'insertion dans wix-data (collection Leads).
}

/**
 * Récupère un lead par identifiant.
 * @param {string} leadId Identifiant du lead.
 * @returns {Promise<Object|null>} Lead trouvé ou null.
 */
export async function getLeadById(leadId) {
  // TODO: Implémenter la lecture d'un lead par ID.
}
