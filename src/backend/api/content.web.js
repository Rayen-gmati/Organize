import { webMethod, Permissions } from 'wix-web-module';
import { MESSAGES } from 'public/constants/messages';
import * as contentService from 'backend/services/contentService';

/**
 * Web module Content.
 * Responsabilité : façade backend en lecture pour le contenu public.
 */

/**
 * Endpoint web pour récupérer le contenu Home.
 * @returns {Promise<Object>} Contenu de la page d'accueil.
 */
async function getHomeContentHandler() {
  try {
    const content = await contentService.getHomeContent();
    return { ok: true, content };
  } catch {
    return { ok: false, errors: { form: MESSAGES.FORM.ERROR_GENERIC } };
  }
}

export const getHomeContent = webMethod(Permissions.Anyone, getHomeContentHandler);
