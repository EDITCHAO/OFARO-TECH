import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [quotes, messages, serviceRequests, internships, applications] = await Promise.all([
      query('SELECT * FROM quote_requests ORDER BY created_at DESC'),
      query('SELECT * FROM contact_messages ORDER BY created_at DESC'),
      query('SELECT * FROM service_requests ORDER BY submitted_at DESC'),
      query('SELECT * FROM internship_requests ORDER BY submitted_at DESC'),
      query('SELECT * FROM applications ORDER BY submitted_at DESC')
    ]);

    return NextResponse.json({
      quotes: quotes.rows.map((item) => ({
        id: String(item.id),
        reference: item.reference_number || `DV-${String(item.id).padStart(3, '0')}`,
        companyName: item.company_name,
        activityField: item.sector || '',
        email: item.email,
        phone: item.phone,
        city: item.city || '',
        desiredServices: typeof item.services === 'string' ? [item.services] : item.services || [],
        description: item.project_description,
        hasLogo: item.has_logo ? 'Oui' : 'Non',
        hasDomainName: item.has_domain ? 'Oui' : 'Non',
        keyFeatures: item.key_feature || '',
        expectedResult: item.expected_result || '',
        budget: item.budget || '',
        contactPersonName: `${item.contact_first_name} ${item.contact_last_name}`.trim(),
        deliveryDate: item.desired_delivery_date || '',
        status: item.status === 'nouveau' ? 'Nouveau' : item.status,
        notes: item.notes || '',
        createdAt: item.created_at,
        isRead: item.is_read
      })),
      messages: messages.rows.map((item) => ({
        id: String(item.id),
        reference: `MSG-${String(item.id).padStart(3, '0')}`,
        name: item.full_name,
        email: item.email,
        phone: item.phone || '',
        subject: item.subject || '',
        message: item.message,
        status: item.status === 'nouveau' ? 'Nouveau' : item.status,
        isRead: item.is_read,
        createdAt: item.created_at,
        response: item.response || ''
      })),
      serviceRequests: serviceRequests.rows.map((item) => ({
        id: String(item.id),
        reference: item.reference_number || `SR-${String(item.id).padStart(3, '0')}`,
        name: item.client_name,
        email: item.client_email,
        phone: item.client_phone,
        service: item.service_type,
        description: item.description,
        status: item.status === 'nouvelle' ? 'Nouveau' : item.status,
        createdAt: item.submitted_at
      })),
      applications: [
        ...internships.rows.map((item) => ({
          id: `internship-${item.id}`,
          reference: item.reference_number || `ST-${String(item.id).padStart(3, '0')}`,
          type: 'Stage',
          position: item.internship_type,
          fullName: `${item.first_name} ${item.last_name}`,
          email: item.email,
          phone: item.phone,
          education: item.education_level || '',
          experience: item.internship_objectives || '',
          cvFileName: item.cv_file_name || '',
          status: item.status === 'nouvelle' ? 'Nouvelle' : item.status,
          createdAt: item.submitted_at
        })),
        ...applications.rows.map((item) => ({
          id: `application-${item.id}`,
          reference: item.reference_number || `APP-${String(item.id).padStart(3, '0')}`,
          type: 'Emploi',
          position: item.position_sought || '',
          fullName: `${item.first_name} ${item.last_name}`,
          email: item.email,
          phone: item.phone,
          education: item.education_level || '',
          experience: item.professional_experience || '',
          cvFileName: item.cv_file_name || '',
          status: item.status === 'nouvelle' ? 'Nouvelle' : item.status,
          createdAt: item.submitted_at
        }))
      ]
    });
  } catch (error) {
    console.error('Erreur lors du chargement des demandes admin:', error);
    return NextResponse.json({ error: 'Impossible de charger les demandes' }, { status: 500 });
  }
}
