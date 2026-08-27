import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Supprimer la demande de service
    await query(
      'DELETE FROM service_requests WHERE id = $1',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Demande de service supprimée avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}
