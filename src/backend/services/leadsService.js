import { createLead } from 'backend/data/leadsRepository';
import { MESSAGES } from 'public/constants/messages';
import { isEmail, isNonEmpty } from 'public/utils/validators';

/**
 * Service Leads.
 * Responsabilité : validation métier et insertion des demandes.
 */

function validateCommon(input = {}) {
  const errors = {};

  if (!isNonEmpty(input.name)) {
    errors.name = MESSAGES.VALIDATION.NAME_REQUIRED;
  }

  if (!isEmail(input.email)) {
    errors.email = MESSAGES.VALIDATION.EMAIL_REQUIRED;
  }

  if (!isNonEmpty(input.message)) {
    errors.message = MESSAGES.VALIDATION.MESSAGE_REQUIRED;
  }

  if (input.consent !== true) {
    errors.consent = MESSAGES.VALIDATION.CONSENT_REQUIRED;
  }

  return errors;
}

/**
 * Enregistre une demande de contact après validation.
 * @param {Object} input Données du formulaire contact.
 * @returns {Promise<Object>} Résultat normalisé.
 */
export async function submitContactLead(input) {
  const payload = input || {};
  const errors = validateCommon(payload);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  try {
    await createLead({
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      company: isNonEmpty(payload.company) ? payload.company.trim() : '',
      message: payload.message.trim(),
      source: 'contact',
      status: 'new',
      consent: true
    });

    return { ok: true };
  } catch {
    return {
      ok: false,
      errors: { form: MESSAGES.FORM.ERROR_GENERIC }
    };
  }
}

/**
 * Enregistre une demande d'audit après validation.
 * @param {Object} input Données du formulaire audit.
 * @returns {Promise<Object>} Résultat normalisé.
 */
export async function submitAuditLead(input) {
  const payload = input || {};
  const errors = validateCommon(payload);

  if (!isNonEmpty(payload.company)) {
    errors.company = MESSAGES.VALIDATION.COMPANY_REQUIRED;
  }

  const companySize = Number(payload.companySize);
  if (!Number.isFinite(companySize) || companySize < 1) {
    errors.companySize = MESSAGES.VALIDATION.COMPANY_SIZE_REQUIRED;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  try {
    await createLead({
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      company: payload.company.trim(),
      companySize,
      message: payload.message.trim(),
      source: 'audit',
      status: 'new',
      consent: true
    });

    return { ok: true };
  } catch {
    return {
      ok: false,
      errors: { form: MESSAGES.FORM.ERROR_GENERIC }
    };
  }
}
