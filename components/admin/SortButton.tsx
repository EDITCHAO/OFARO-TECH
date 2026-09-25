'use client';

import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

interface SortButtonProps {
  label: string;
  field: string;
  currentField: string;
  currentOrder: 'asc' | 'desc';
  onClick: (field: string) => void;
}

export default function SortButton({
  label,
  field,
  currentField,
  currentOrder,
  onClick
}: SortButtonProps) {
  const isActive = currentField === field;

  return (
    <button
      onClick={() => onClick(field)}
      className="inline-flex items-center gap-1 hover:text-primary-600 transition-colors font-medium"
      title={`Trier par ${label}`}
    >
      {label}
      {isActive ? (
        currentOrder === 'asc' ? (
          <FaSortUp className="text-primary-500" />
        ) : (
          <FaSortDown className="text-primary-500" />
        )
      ) : (
        <FaSort className="text-neutral-400" />
      )}
    </button>
  );
}
