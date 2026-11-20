'use client';

import { useState, useEffect } from 'react';
import { COMPANY_INFO } from '@/lib/constants';

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  opening_hours: string;
  google_maps_url: string;
};

// Valeurs par défaut depuis les constantes statiques (fallback immédiat)
const defaults: SiteSettings = {
  phone:           COMPANY_INFO.phone,
  whatsapp:        COMPANY_INFO.whatsapp,
  email:           COMPANY_INFO.email,
  address:         `${COMPANY_INFO.address}, ${COMPANY_INFO.city}, ${COMPANY_INFO.country}`,
  opening_hours:   COMPANY_INFO.openingHours,
  google_maps_url: '',
};

export function useSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(defaults);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.settings) {
          setSettings({
            phone:           json.settings.phone           || defaults.phone,
            whatsapp:        json.settings.whatsapp        || defaults.whatsapp,
            email:           json.settings.email           || defaults.email,
            address:         json.settings.address         || defaults.address,
            opening_hours:   json.settings.opening_hours   || defaults.opening_hours,
            google_maps_url: json.settings.google_maps_url || '',
          });
        }
      })
      .catch(() => {/* garde le fallback silencieusement */});
  }, []);

  return settings;
}
