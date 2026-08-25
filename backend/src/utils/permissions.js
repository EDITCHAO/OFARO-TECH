const ROLE_PERMISSIONS = {
  administrateur: {
    dashboard: true,
    pages: true,
    articles: true,
    realizations: true,
    services: true,
    testimonials: true,
    quote_requests: true,
    contact_messages: true,
    job_applications: true,
    internships: true,
    clients: true,
    team: true,
    documents: true,
    users: true,
    media_library: true,
    seo: true,
    logs: true
  },
  editeur: {
    dashboard: true,
    pages: true,
    articles: true,
    realizations: true,
    services: false,
    testimonials: true,
    quote_requests: false,
    contact_messages: false,
    job_applications: false,
    internships: false,
    clients: false,
    team: false,
    documents: false,
    users: false,
    media_library: true,
    seo: false,
    logs: false
  },
  commercial: {
    dashboard: true,
    pages: false,
    articles: false,
    realizations: false,
    services: false,
    testimonials: false,
    quote_requests: true,
    contact_messages: true,
    job_applications: false,
    internships: false,
    clients: false,
    team: false,
    documents: false,
    users: false,
    media_library: false,
    seo: false,
    logs: false
  },
  rh: {
    dashboard: true,
    pages: false,
    articles: false,
    realizations: false,
    services: false,
    testimonials: false,
    quote_requests: false,
    contact_messages: false,
    job_applications: true,
    internships: true,
    clients: false,
    team: false,
    documents: false,
    users: false,
    media_library: false,
    seo: false,
    logs: false
  }
};

const can = (role, permission) => Boolean(ROLE_PERMISSIONS[role] && ROLE_PERMISSIONS[role][permission]);

module.exports = {
  ROLE_PERMISSIONS,
  can
};
