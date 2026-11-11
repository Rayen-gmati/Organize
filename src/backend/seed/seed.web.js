/**
 * Seed web module.
 * Responsabilité : initialiser des données de référence de manière contrôlée.
 */

import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';
import { FIELDS } from 'public/constants/fields';
import { insertTeamMember, listTeamMembers } from 'backend/data/teamRepository';
import { insertOffer, listActiveOffers } from 'backend/data/offersRepository';
import { insertFaq, listPublishedFaq } from 'backend/data/faqRepository';
import { insertSiteSettings, getSiteSettings } from 'backend/data/settingsRepository';
import { insertTestimonial, listTestimonials } from 'backend/data/testimonialsRepository';

const TEAM_MEMBERS = [
  {
    [FIELDS.teamMembers.NAME]: 'Camille Martin',
    [FIELDS.teamMembers.ROLE]: 'Co-fondatrice · Audit & process',
    [FIELDS.teamMembers.BIOGRAPHY]: 'Camille accompagne les PME dans la clarification de leurs processus et l’identification des points de friction internes.',
    [FIELDS.teamMembers.PHOTO]: '',
    [FIELDS.teamMembers.ORDER]: 1
  },
  {
    [FIELDS.teamMembers.NAME]: 'Lucas Bernard',
    [FIELDS.teamMembers.ROLE]: 'Co-fondateur · Automatisation & IA',
    [FIELDS.teamMembers.BIOGRAPHY]: 'Lucas aide les organisations à structurer leurs outils et à mettre en place des automatisations fiables et utiles.',
    [FIELDS.teamMembers.PHOTO]: '',
    [FIELDS.teamMembers.ORDER]: 2
  }
];

const OFFERS = [
  {
    [FIELDS.offers.TIER]: 'Audit',
    [FIELDS.offers.SUMMARY]: 'Analyse de l’organisation actuelle pour identifier les frictions et les pertes de temps cachées.',
    [FIELDS.offers.FEATURES]: 'Diagnostic des processus internes\nCartographie des outils et des flux\nRecommandations prioritaires',
    [FIELDS.offers.ORDER]: 1,
    [FIELDS.offers.PUBLISHED]: true
  },
  {
    [FIELDS.offers.TIER]: 'Centralisation',
    [FIELDS.offers.SUMMARY]: 'Mise en place d’un espace de travail Google cohérent pour retrouver l’information rapidement et réduire les doublons.',
    [FIELDS.offers.FEATURES]: 'Structuration du drive et des outils\nStandardisation des process\nAccès plus simple à l’information',
    [FIELDS.offers.ORDER]: 2,
    [FIELDS.offers.PUBLISHED]: true
  },
  {
    [FIELDS.offers.TIER]: 'Automatisation',
    [FIELDS.offers.SUMMARY]: 'Automatisation des tâches répétitives et intégration de l’IA pour accélérer les opérations sans perdre la qualité humaine.',
    [FIELDS.offers.FEATURES]: 'Tâches répétitives automatisées\nIA utile et orientée résultats\nAccompagnement de mise en place',
    [FIELDS.offers.ORDER]: 3,
    [FIELDS.offers.PUBLISHED]: true
  }
];

const FAQ_ITEMS = [
  {
    [FIELDS.faq.QUESTION]: 'Qu’est-ce qu’un audit organisationnel ?',
    [FIELDS.faq.ANSWER]: 'C’est une analyse de votre organisation interne pour repérer les frictions, les pertes de temps et les outils qui ne sont pas utiles ou mal connectés.',
    [FIELDS.faq.CATEGORY]: 'Méthode',
    [FIELDS.faq.ORDER]: 1,
    [FIELDS.faq.PUBLISHED]: true
  },
  {
    [FIELDS.faq.QUESTION]: 'À qui s’adresse Organize ?',
    [FIELDS.faq.ANSWER]: 'Nous accompagnons les PME qui souhaitent gagner du temps, clarifier leurs outils et structurer leur organisation sans bouleverser leur quotidien.',
    [FIELDS.faq.CATEGORY]: 'Entreprise',
    [FIELDS.faq.ORDER]: 2,
    [FIELDS.faq.PUBLISHED]: true
  },
  {
    [FIELDS.faq.QUESTION]: 'Comment se déroule le projet ?',
    [FIELDS.faq.ANSWER]: 'Nous démarrons par un audit, puis nous centralisons les outils et les informations, et enfin nous automatisons les tâches répétitives selon les priorités identifiées.',
    [FIELDS.faq.CATEGORY]: 'Méthode',
    [FIELDS.faq.ORDER]: 3,
    [FIELDS.faq.PUBLISHED]: true
  },
  {
    [FIELDS.faq.QUESTION]: 'Travaillez-vous uniquement avec Google Workspace ?',
    [FIELDS.faq.ANSWER]: 'Nous privilégions un écosystème Google cohérent, mais nous adaptons nos recommandations à la réalité de votre organisation et à vos logiciels existants.',
    [FIELDS.faq.CATEGORY]: 'Outils',
    [FIELDS.faq.ORDER]: 4,
    [FIELDS.faq.PUBLISHED]: true
  },
  {
    [FIELDS.faq.QUESTION]: 'Combien de temps faut-il pour voir des résultats ?',
    [FIELDS.faq.ANSWER]: 'Les premiers gains se font souvent dès les premières semaines, avec des améliorations progressives à mesure que les process et les automatisations sont mis en place.',
    [FIELDS.faq.CATEGORY]: 'Résultats',
    [FIELDS.faq.ORDER]: 5,
    [FIELDS.faq.PUBLISHED]: true
  },
  {
    [FIELDS.faq.QUESTION]: 'Proposez-vous un accompagnement humain ?',
    [FIELDS.faq.ANSWER]: 'Oui. Nous prenons le temps d’écouter votre équipe, de comprendre vos contraintes et de vous proposer des recommandations concrètes et applicables.',
    [FIELDS.faq.CATEGORY]: 'Accompagnement',
    [FIELDS.faq.ORDER]: 6,
    [FIELDS.faq.PUBLISHED]: true
  }
];

const SITE_SETTINGS = {
  [FIELDS.siteSettings.CONTACT_EMAIL]: 'contact@organize-conseil.be',
  [FIELDS.siteSettings.PHONE_NUMBER]: '+32 470 00 00 00', // TODO(valider)
  [FIELDS.siteSettings.LINKEDIN_URL]: 'https://www.linkedin.com/company/organize-conseil',
  [FIELDS.siteSettings.LOGO_IMAGE]: '',
  [FIELDS.siteSettings.BUSINESS_HOURS]: 'Lun-Ven 9h-17h' // TODO(valider)
};

const TESTIMONIALS = [
  {
    [FIELDS.testimonials.AUTHOR]: 'Client à valider',
    [FIELDS.testimonials.ROLE]: 'Direction',
    [FIELDS.testimonials.COMPANY]: 'Entreprise à confirmer',
    [FIELDS.testimonials.QUOTE]: 'Témoignage d’exemple à valider avant publication.',
    [FIELDS.testimonials.RATING]: 5,
    [FIELDS.testimonials.PUBLISHED]: false,
    [FIELDS.testimonials.ORDER]: 1
    // TODO(valider): remplacer par un témoignage réel avant publication.
  }
];

async function ensureOneItem(collectionId, selector, insertFn, item) {
  const { items } = await wixData.query(collectionId).eq(selector.key, selector.value).find();

  if (items.length > 0) {
    return items[0];
  }

  return insertFn(item);
}

async function hasCollectionItems(collectionId) {
  const { items } = await wixData.query(collectionId).limit(1).find();
  return items.length > 0;
}

/**
 * Lance l'initialisation des données de référence.
 * @returns {Promise<Object>} Résumé d'initialisation.
 */
export async function runSeed() {
  const created = {
    teamMembers: [],
    offers: [],
    faq: [],
    siteSettings: null,
    testimonials: []
  };

  const teamMembersExists = await hasCollectionItems(COLLECTIONS.TEAM_MEMBERS);
  if (!teamMembersExists) {
    for (const member of TEAM_MEMBERS) {
      const existing = await ensureOneItem(
        COLLECTIONS.TEAM_MEMBERS,
        { key: FIELDS.teamMembers.NAME, value: member[FIELDS.teamMembers.NAME] },
        insertTeamMember,
        member
      );
      created.teamMembers.push(existing);
    }
  } else {
    created.teamMembers = await listTeamMembers();
  }

  const offersExists = await hasCollectionItems(COLLECTIONS.OFFERS);
  if (!offersExists) {
    for (const offer of OFFERS) {
      const existing = await ensureOneItem(
        COLLECTIONS.OFFERS,
        { key: FIELDS.offers.TIER, value: offer[FIELDS.offers.TIER] },
        insertOffer,
        offer
      );
      created.offers.push(existing);
    }
  } else {
    created.offers = await listActiveOffers();
  }

  const faqExists = await hasCollectionItems(COLLECTIONS.FAQ);
  if (!faqExists) {
    for (const faq of FAQ_ITEMS) {
      const existing = await ensureOneItem(
        COLLECTIONS.FAQ,
        { key: FIELDS.faq.QUESTION, value: faq[FIELDS.faq.QUESTION] },
        insertFaq,
        faq
      );
      created.faq.push(existing);
    }
  } else {
    created.faq = await listPublishedFaq();
  }

  const existingSettings = await getSiteSettings();
  if (existingSettings) {
    created.siteSettings = existingSettings;
  } else {
    created.siteSettings = await insertSiteSettings(SITE_SETTINGS);
  }

  const testimonialsExists = await hasCollectionItems(COLLECTIONS.TESTIMONIALS);
  if (!testimonialsExists) {
    for (const testimonial of TESTIMONIALS) {
      const createdTestimonial = await insertTestimonial(testimonial);
      created.testimonials.push(createdTestimonial);
    }
  } else {
    created.testimonials = await listTestimonials();
  }

  return created;
}
