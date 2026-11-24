import { webMethod, Permissions } from 'wix-web-module';
import { MESSAGES } from 'public/constants/messages';
import * as leadsService from 'backend/services/leadsService';

/**
 * Web module Leads.
 * Responsabilité : façade backend pour les demandes de contact et d'audit.
 */

/**
 * Soumet une demande de contact au service Leads.
 */
async function submitContactLeadHandler(payload) {
  try {
    return await leadsService.submitContactLead(payload);
  } catch {
    return { ok: false, errors: { form: MESSAGES.FORM.ERROR_GENERIC } };
  }
}

/**
 * Soumet une demande d'audit au service Leads.
 */
async function submitAuditLeadHandler(payload) {
  try {
    return await leadsService.submitAuditLead(payload);
  } catch {
    return { ok: false, errors: { form: MESSAGES.FORM.ERROR_GENERIC } };
  }
}

export const submitContactLead = webMethod(Permissions.Anyone, submitContactLeadHandler);
export const submitAuditLead = webMethod(Permissions.Anyone, submitAuditLeadHandler);
