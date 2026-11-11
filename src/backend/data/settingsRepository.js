import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';
import { FIELDS } from 'public/constants/fields';

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

/**
 * Récupère l'email de contact principal.
 * @returns {Promise<string|null>} Email de contact.
 */
export async function getContactEmail() {
  const settings = await getSiteSettings();
  return settings ? settings[FIELDS.siteSettings.CONTACT_EMAIL] : null;
}

/**
 * Récupère le numéro de téléphone principal.
 * @returns {Promise<string|null>} Numéro de téléphone.
 */
export async function getPhoneNumber() {
  const settings = await getSiteSettings();
  return settings ? settings[FIELDS.siteSettings.PHONE_NUMBER] : null;
}

/**
 * Récupère l'URL de l'image du logo.
 * @returns {Promise<string|null>} URL de l'image du logo.
 */
export async function getLogoImage() {
  const settings = await getSiteSettings();
  return settings ? settings[FIELDS.siteSettings.LOGO_IMAGE] : null;
}

/**
 * Récupère les horaires d'ouverture.
 * @returns {Promise<Object|null>} Horaires d'ouverture.
 */
export async function getBusinessHours() {
  const settings = await getSiteSettings();
  return settings ? settings[FIELDS.siteSettings.BUSINESS_HOURS] : null;
}
