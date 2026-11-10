import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';

/**
 * Repository SiteSettings.
 * Responsabilité : centraliser les accès à la collection SiteSettings.
 */

/**
 * Récupère les paramètres globaux du site.
 * @returns {Promise<Object|null>} Paramètres du site.
 */
export async function getSiteSettings() {
  const { items } = await wixData.query(COLLECTIONS.SITE_SETTINGS).find();
  return items[0] || null;
}

/**
 * Insère les paramètres globaux du site.
 * @param {Object} payload Paramètres du site.
 * @returns {Promise<Object>} Paramètres créés.
 */
export async function insertSiteSettings(payload) {
  return wixData.insert(COLLECTIONS.SITE_SETTINGS, payload, { suppressAuth: true });
}

/**
 * Crée ou met à jour les paramètres globaux du site.
 * @param {Object} payload Paramètres du site.
 * @returns {Promise<Object>} Paramètres enregistrés.
 */
export async function upsertSiteSettings(payload) {
  const existingSettings = await getSiteSettings();

  if (existingSettings) {
    return wixData.update(COLLECTIONS.SITE_SETTINGS, {
      ...existingSettings,
      ...payload
    }, { suppressAuth: true });
  }

  return insertSiteSettings(payload);
}
