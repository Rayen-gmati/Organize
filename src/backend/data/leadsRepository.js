import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';
import { FIELDS } from 'public/constants/fields';

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
  return wixData.insert(COLLECTIONS.LEADS, payload, { suppressAuth: true });
}

/**
 * Récupère un lead par identifiant.
 * @param {string} leadId Identifiant du lead.
 * @returns {Promise<Object|null>} Lead trouvé ou null.
 */
export async function getLeadById(leadId) {
  return wixData.get(COLLECTIONS.LEADS, leadId);
}

/**
 * Liste les leads selon un statut.
 * @param {string} status Statut du lead.
 * @returns {Promise<Array>} Leads trouvés.
 */
export async function listLeadsByStatus(status) {
  const { items } = await wixData
    .query(COLLECTIONS.LEADS)
    .eq(FIELDS.leads.STATUS, status)
    .descending('_createdDate')
    .find();

  return items;
}
