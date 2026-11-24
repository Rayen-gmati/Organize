import { listActiveOffers } from 'backend/data/offersRepository';
import { listPublishedFaq } from 'backend/data/faqRepository';
import { listTestimonials } from 'backend/data/testimonialsRepository';
import { getSiteSettings } from 'backend/data/settingsRepository';

/**
 * Service Content.
 * Responsabilité : assembler les données publiques de la page Accueil.
 */

/**
 * Récupère les offres, FAQ, témoignages publiés et paramètres globaux.
 * @returns {Promise<Object>} Contenu agrégé de la page d'accueil.
 */
export async function getHomeContent() {
  const [offers, faq, testimonials, settings] = await Promise.all([
    listActiveOffers(),
    listPublishedFaq(),
    listTestimonials(),
    getSiteSettings()
  ]);

  return {
    offers,
    faq,
    testimonials,
    settings: settings || null
  };
}
