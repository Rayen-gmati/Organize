import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';
import { FIELDS } from 'public/constants/fields';

/**
 * Repository Testimonials.
 * Responsabilité : centraliser les accès à la collection Testimonials.
 */

/**
 * Liste les témoignages à afficher.
 * @returns {Promise<Array>} Liste des témoignages.
 */
export async function listTestimonials() {
  const { items } = await wixData
    .query(COLLECTIONS.TESTIMONIALS)
    .eq(FIELDS.testimonials.PUBLISHED, true)
    .ascending(FIELDS.testimonials.ORDER)
    .find();

  return items;
}

/**
 * Insère un témoignage dans la collection Testimonials.
 * @param {Object} payload Données du témoignage.
 * @returns {Promise<Object>} Témoignage créé.
 */
export async function insertTestimonial(payload) {
  return wixData.insert(COLLECTIONS.TESTIMONIALS, payload, { suppressAuth: true });
}
