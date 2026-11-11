import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';
import { FIELDS } from 'public/constants/fields';

/**
 * Repository Offers.
 * Responsabilité : centraliser les accès à la collection Offers.
 */

/**
 * Liste les offres actives.
 * @returns {Promise<Array>} Liste des offres.
 */
export async function listActiveOffers() {
  const { items } = await wixData
    .query(COLLECTIONS.OFFERS)
    .eq(FIELDS.offers.PUBLISHED, true)
    .ascending(FIELDS.offers.ORDER)
    .find();

  return items;
}

/**
 * Insère une offre dans la collection Offers.
 * @param {Object} payload Données de l'offre.
 * @returns {Promise<Object>} Offre créée.
 */
export async function insertOffer(payload) {
  return wixData.insert(COLLECTIONS.OFFERS, payload, { suppressAuth: true });
}
