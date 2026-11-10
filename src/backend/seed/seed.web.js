/**
 * Seed web module.
 * Responsabilité : initialiser des données de référence de manière contrôlée.
 */

import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants/collections';
import { insertTeamMember, listTeamMembers } from 'backend/data/teamRepository';
import { insertOffer, listActiveOffers } from 'backend/data/offersRepository';
import { insertFaq, listPublishedFaq } from 'backend/data/faqRepository';
import { insertSiteSettings, getSiteSettings } from 'backend/data/settingsRepository';
import { insertTestimonial, listTestimonials } from 'backend/data/testimonialsRepository';

const TEAM_MEMBERS = [
  {
    name: 'Camille Martin',
    role: 'Co-fondatrice · Audit & process',
    bio: 'Camille accompagne les PME dans la clarification de leurs processus et l’identification des points de friction internes.',
    photo: '',
    order: 1
  },
  {
    name: 'Lucas Bernard',
    role: 'Co-fondateur · Automatisation & IA',
    bio: 'Lucas aide les organisations à structurer leurs outils et à mettre en place des automatisations fiables et utiles.',
    photo: '',
    order: 2
  }
];

const OFFERS = [
  {
    title: 'Audit',
    tier: 'Diagnostic',
    summary: 'Analyse de l’organisation actuelle pour identifier les frictions et les pertes de temps cachées.',
    features: [
      'Diagnostic des processus internes',
      'Cartographie des outils et des flux',
      'Recommandations prioritaires'
    ],
    order: 1,
    published: true
  },
  {
    title: 'Centralisation',
    tier: 'Organisation',
    summary: 'Mise en place d’un espace de travail Google cohérent pour retrouver l’information rapidement et réduire les doublons.',
    features: [
      'Structuration du drive et des outils',
      'Standardisation des process',
      'Accès plus simple à l’information'
    ],
    order: 2,
    published: true
  },
  {
    title: 'Automatisation',
    tier: 'Performance',
    summary: 'Automatisation des tâches répétitives et intégration de l’IA pour accélérer les opérations sans perdre la qualité humaine.',
    features: [
      'Tâches répétitives automatisées',
      'IA utile et orientée résultats',
      'Accompagnement de mise en place'
    ],
    order: 3,
    published: true
  }
];

const FAQ_ITEMS = [
  {
    question: 'Qu’est-ce qu’un audit organisationnel ?',
    answer: 'C’est une analyse de votre organisation interne pour repérer les frictions, les pertes de temps et les outils qui ne sont pas utiles ou mal connectés.',
    category: 'Méthode',
    order: 1,
    published: true
  },
  {
    question: 'À qui s’adresse Organize ?',
    answer: 'Nous accompagnons les PME qui souhaitent gagner du temps, clarifier leurs outils et structurer leur organisation sans bouleverser leur quotidien.',
    category: 'Entreprise',
    order: 2,
    published: true
  },
  {
    question: 'Comment se déroule le projet ?',
    answer: 'Nous démarrons par un audit, puis nous centralisons les outils et les informations, et enfin nous automatisons les tâches répétitives selon les priorités identifiées.',
    category: 'Méthode',
    order: 3,
    published: true
  },
  {
    question: 'Travaillez-vous uniquement avec Google Workspace ?',
    answer: 'Nous privilégions un écosystème Google cohérent, mais nous adaptons nos recommandations à la réalité de votre organisation et à vos logiciels existants.',
    category: 'Outils',
    order: 4,
    published: true
  },
  {
    question: 'Combien de temps faut-il pour voir des résultats ?',
    answer: 'Les premiers gains se font souvent dès les premières semaines, avec des améliorations progressives à mesure que les process et les automatisations sont mis en place.',
    category: 'Résultats',
    order: 5,
    published: true
  },
  {
    question: 'Proposez-vous un accompagnement humain ?',
    answer: 'Oui. Nous prenons le temps d’écouter votre équipe, de comprendre vos contraintes et de vous proposer des recommandations concrètes et applicables.',
    category: 'Accompagnement',
    order: 6,
    published: true
  }
];

const SITE_SETTINGS = {
  contactEmail: 'contact@organize-conseil.be',
  phone: '+32 470 00 00 00',
  linkedinUrl: 'https://www.linkedin.com/company/organize-conseil'
};

const TESTIMONIALS = [
  {
    author: 'Client à valider',
    role: 'Direction',
    company: 'Entreprise à confirmer',
    quote: 'Témoignage d’exemple à valider avant publication.',
    rating: 5,
    published: false,
    order: 1
    // TODO(valider): remplacer par un témoignage réel avant mise en ligne.
  }
];

async function ensureOneItem(collectionId, selector, insertFn, item) {
  const { items } = await wixData.query(collectionId).eq(selector.key, selector.value).find();

  if (items.length > 0) {
    return items[0];
  }

  return insertFn(item);
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

  for (const member of TEAM_MEMBERS) {
    const existing = await ensureOneItem(
      COLLECTIONS.TEAM_MEMBERS,
      { key: 'name', value: member.name },
      insertTeamMember,
      member
    );
    created.teamMembers.push(existing);
  }

  for (const offer of OFFERS) {
    const existing = await ensureOneItem(
      COLLECTIONS.OFFERS,
      { key: 'title', value: offer.title },
      insertOffer,
      offer
    );
    created.offers.push(existing);
  }

  for (const faq of FAQ_ITEMS) {
    const existing = await ensureOneItem(
      COLLECTIONS.FAQ,
      { key: 'question', value: faq.question },
      insertFaq,
      faq
    );
    created.faq.push(existing);
  }

  const existingSettings = await getSiteSettings();
  if (existingSettings) {
    created.siteSettings = existingSettings;
  } else {
    created.siteSettings = await insertSiteSettings(SITE_SETTINGS);
  }

  const existingTestimonials = await listTestimonials();
  if (existingTestimonials.length === 0) {
    for (const testimonial of TESTIMONIALS) {
      const createdTestimonial = await insertTestimonial(testimonial);
      created.testimonials.push(createdTestimonial);
    }
  } else {
    created.testimonials = existingTestimonials;
  }

  return created;
}
