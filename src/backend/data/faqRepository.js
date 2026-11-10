import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';

/**
 * Repository FAQ.
 * Responsabilité : centraliser les lectures/écritures de la collection Faq.
 */

/**
 * Liste les entrées FAQ publiées.
 * @returns {Promise<Array>} Liste FAQ.
 */
export async function listPublishedFaq() {
  const { items } = await wixData
    .query(COLLECTIONS.FAQ)
    .eq('published', true)
    .ascending('order')
    .find();

  return items;
}

/**
 * Insère une entrée FAQ dans la collection Faq.
 * @param {Object} payload Données FAQ.
 * @returns {Promise<Object>} Entrée créée.
 */
export async function insertFaq(payload) {
  return wixData.insert(COLLECTIONS.FAQ, payload, { suppressAuth: true });
}
