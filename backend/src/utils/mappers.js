const parseMaybeJson = (value) => {
  if (!value) return value;
  if (Array.isArray(value) || typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch (_error) {
    return value;
  }
};

const mapQuote = (row) => ({
  id: row.id,
  company: row.company_name || row.client_name || '',
  contact_name: [row.contact_first_name, row.contact_last_name].filter(Boolean).join(' ') || row.client_name || '',
  email: row.email || row.client_email || '',
  phone: row.phone || row.client_phone || '',
  city: row.city || '',
  sector: row.sector || row.activity_field || '',
  service: row.project_type || (Array.isArray(parseMaybeJson(row.services))
    ? parseMaybeJson(row.services).join(', ')
    : row.services) || '',
  description: row.project_description || row.description || '',
  budget: row.budget || '',
  deadline: row.deadline || row.desired_delivery_date || null,
  status: row.status || 'nouveau',
  reference: row.reference_number || null,
  is_read: row.is_read === true || row.status === 'traite',
  created_at: row.created_at || row.submitted_at,
  raw: row
});

const mapMessage = (row) => ({
  id: row.id,
  name: row.full_name || row.sender_name || '',
  email: row.email || row.sender_email || '',
  phone: row.phone || row.sender_phone || '',
  subject: row.subject || '',
  message: row.message || '',
  status: row.status || 'nouveau',
  is_read: row.is_read === true || ['en_cours', 'traite', 'lu'].includes(row.status),
  reference: row.reference_number || null,
  created_at: row.created_at || row.submitted_at,
  raw: row
});

const mapApplication = (row, type = 'application') => ({
  id: row.id,
  type,
  application_type: row.application_type || type,
  first_name: row.first_name || '',
  last_name: row.last_name || '',
  email: row.email || '',
  phone: row.phone || '',
  position: row.position_sought || row.title || '',
  status: row.status || 'nouvelle',
  cv_file_name: row.cv_file_name || null,
  cv_file_path: row.cv_file_path || null,
  cover_letter_file_name: row.cover_letter_file_name || null,
  reference: row.reference_number || null,
  created_at: row.created_at || row.submitted_at,
  raw: row
});

module.exports = {
  parseMaybeJson,
  mapQuote,
  mapMessage,
  mapApplication
};
