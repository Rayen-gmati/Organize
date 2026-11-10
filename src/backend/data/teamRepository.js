import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';

/**
 * Repository TeamMembers.
 * Responsabilité : centraliser les accès à la collection TeamMembers.
 */

/**
 * Liste les membres de l'équipe à afficher.
 * @returns {Promise<Array>} Liste des membres.
 */
export async function listTeamMembers() {
  const { items } = await wixData
    .query(COLLECTIONS.TEAM_MEMBERS)
    .ascending('order')
    .find();

  return items;
}

/**
 * Insère un membre de l'équipe.
 * @param {Object} payload Données du membre.
 * @returns {Promise<Object>} Membre créé.
 */
export async function insertTeamMember(payload) {
  return wixData.insert(COLLECTIONS.TEAM_MEMBERS, payload, { suppressAuth: true });
}
