import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let queryText = `
      SELECT 
        sr.*,
        u.first_name as assigned_user_first_name,
        u.last_name as assigned_user_last_name
      FROM service_requests sr
      LEFT JOIN users u ON sr.assigned_to = u.id
    `;
    
    const params: any[] = [];
    
    if (status && status !== 'tous') {
      queryText += ` WHERE sr.status = $1`;
      params.push(status);
      queryText += ` ORDER BY sr.submitted_at DESC LIMIT $2 OFFSET $3`;
      params.push(limit, offset);
    } else {
      queryText += ` ORDER BY sr.submitted_at DESC LIMIT $1 OFFSET $2`;
      params.push(limit, offset);
    }

    const result = await query(queryText, params);

    // Récupérer le compte total
    let countQuery = 'SELECT COUNT(*) as total FROM service_requests';
    const countParams: any[] = [];
    
    if (status && status !== 'tous') {
      countQuery += ' WHERE status = $1';
      countParams.push(status);
    }
    
    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);

    return NextResponse.json({
      success: true,
      data: result.rows,
      pagination: {
        total,
        limit,
        offset,
        hasMore: (offset + limit) < total
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des demandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des demandes' },
      { status: 500 }
    );
  }
}
