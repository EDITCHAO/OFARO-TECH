// Utilitaires pour la page admin

/**
 * Fonction générique de tri pour les tableaux
 */
export function sortData<T>(
  data: T[],
  field: keyof T,
  order: 'asc' | 'desc'
): T[] {
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    // Gestion des valeurs nulles/undefined
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    // Tri numérique
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Tri de dates (format français "JJ mois AAAA, HH:MM")
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      // Tentative de conversion en date si c'est une date
      const dateA = parseDate(aVal);
      const dateB = parseDate(bVal);
      
      if (dateA && dateB) {
        return order === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Tri alphabétique
      const comparison = aVal.localeCompare(bVal, 'fr-FR');
      return order === 'asc' ? comparison : -comparison;
    }

    return 0;
  });
}

/**
 * Parser pour les dates au format français
 */
function parseDate(dateStr: string): Date | null {
  try {
    // Format: "18 août 2026, 14:22" ou "18 août 2026"
    const months: Record<string, number> = {
      'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3,
      'mai': 4, 'juin': 5, 'juillet': 6, 'août': 7,
      'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };

    const parts = dateStr.split(',')[0].trim().split(' ');
    if (parts.length >= 3) {
      const day = parseInt(parts[0]);
      const month = months[parts[1].toLowerCase()];
      const year = parseInt(parts[2]);

      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

/**
 * Confirmation de suppression
 */
export function confirmDelete(itemName: string): boolean {
  return confirm(`Êtes-vous sûr de vouloir supprimer définitivement "${itemName}" ?\n\nCette action est irréversible.`);
}

/**
 * Formattage des statuts avec couleurs
 */
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    'Nouveau': 'bg-blue-100 text-blue-800',
    'new': 'bg-blue-100 text-blue-800',
    'Nouvelle': 'bg-blue-100 text-blue-800',
    'En cours': 'bg-yellow-100 text-yellow-800',
    'in_progress': 'bg-yellow-100 text-yellow-800',
    'En analyse': 'bg-purple-100 text-purple-800',
    'Traité': 'bg-green-100 text-green-800',
    'completed': 'bg-green-100 text-green-800',
    'Entretien': 'bg-indigo-100 text-indigo-800',
    'Retenu': 'bg-emerald-100 text-emerald-800',
    'Rejeté': 'bg-red-100 text-red-800',
    'Sans suite': 'bg-gray-100 text-gray-800'
  };

  return statusMap[status] || 'bg-gray-100 text-gray-800';
}
