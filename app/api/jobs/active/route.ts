import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Récupérer toutes les offres publiées et non expirées
    const result = await query(
      `SELECT 
        id,
        reference,
        title,
        department,
        contract_type,
        location,
        work_mode,
        description,
        missions,
        responsibilities,
        required_skills,
        profile,
        education_level,
        experience_level,
        publication_date,
        application_deadline,
        published_at
      FROM job_offers 
      WHERE status = 'publiee' 
      AND (application_deadline IS NULL OR application_deadline >= CURRENT_DATE)
      ORDER BY publication_date DESC`
    );

    const jobs = result.rows;

    return NextResponse.json({
      success: true,
      count: jobs.length,
      data: jobs
    }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la récupération des offres:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des offres' },
      { status: 500 }
    );
  }
}
