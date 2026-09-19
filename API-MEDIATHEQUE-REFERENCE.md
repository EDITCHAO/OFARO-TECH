# 🔌 API Médiathèque - Référence Rapide

## 📚 Table des matières

1. [Requêtes SQL courantes](#requêtes-sql-courantes)
2. [Code TypeScript/React](#code-typescriptreact)
3. [Exemples d'utilisation](#exemples-dutilisation)
4. [Interface TypeScript](#interface-typescript)

---

## 🗄️ Requêtes SQL courantes

### Récupérer toutes les images actives

```sql
SELECT * FROM media_library 
WHERE is_active = true 
ORDER BY created_at DESC;
```

### Récupérer images par catégorie

```sql
SELECT * FROM media_library 
WHERE category = 'portfolio' 
AND is_active = true 
ORDER BY created_at DESC;
```

### Rechercher par nom

```sql
SELECT * FROM media_library 
WHERE original_name ILIKE '%recherche%' 
AND is_active = true;
```

### Statistiques par catégorie

```sql
SELECT 
  category,
  COUNT(*) as total,
  SUM(file_size) as total_bytes,
  ROUND(SUM(file_size)::numeric / 1024 / 1024, 2) as total_mb
FROM media_library
WHERE is_active = true
GROUP BY category
ORDER BY total DESC;
```

### Images les plus récentes (top 10)

```sql
SELECT id, original_name, category, file_url, created_at
FROM media_library
WHERE is_active = true
ORDER BY created_at DESC
LIMIT 10;
```

### Images les plus lourdes

```sql
SELECT original_name, category, file_size, width, height
FROM media_library
WHERE is_active = true
ORDER BY file_size DESC
LIMIT 10;
```

### Espace de stockage total

```sql
SELECT 
  COUNT(*) as total_images,
  SUM(file_size) as total_bytes,
  ROUND(SUM(file_size)::numeric / 1024 / 1024, 2) as total_mb,
  ROUND(SUM(file_size)::numeric / 1024 / 1024 / 1024, 2) as total_gb
FROM media_library
WHERE is_active = true;
```

---

## 💻 Code TypeScript/React

### Interface TypeScript

```typescript
interface MediaItem {
  id: number;
  file_name: string;
  original_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  width: number;
  height: number;
  alt_text: string;
  caption: string;
  category: string;
  uploaded_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

### 1. Récupérer toutes les images

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

const { data: images, error } = await supabase
  .from('media_library')
  .select('*')
  .eq('is_active', true)
  .order('created_at', { ascending: false });

if (error) {
  console.error('Erreur:', error);
} else {
  console.log('Images:', images);
}
```

### 2. Récupérer par catégorie

```typescript
const { data: portfolioImages } = await supabase
  .from('media_library')
  .select('*')
  .eq('category', 'portfolio')
  .eq('is_active', true)
  .order('created_at', { ascending: false });
```

### 3. Rechercher des images

```typescript
const searchTerm = 'projet';

const { data: results } = await supabase
  .from('media_library')
  .select('*')
  .or(`original_name.ilike.%${searchTerm}%,alt_text.ilike.%${searchTerm}%,caption.ilike.%${searchTerm}%`)
  .eq('is_active', true);
```

### 4. Upload une image

```typescript
async function uploadImage(file: File, category: string, altText?: string, caption?: string) {
  // 1. Get dimensions
  const dimensions = await getImageDimensions(file);
  
  // 2. Generate filename
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const fileName = `${category}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  // 3. Upload to Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('media-library')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (uploadError) throw uploadError;
  
  // 4. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('media-library')
    .getPublicUrl(fileName);
  
  // 5. Save to database
  const { data: dbData, error: dbError } = await supabase
    .from('media_library')
    .insert({
      file_name: fileName,
      original_name: file.name,
      file_url: publicUrl,
      file_size: file.size,
      mime_type: file.type,
      width: dimensions.width,
      height: dimensions.height,
      alt_text: altText || file.name,
      caption: caption,
      category: category,
      uploaded_by: 'Admin',
      is_active: true
    })
    .select()
    .single();
  
  if (dbError) throw dbError;
  
  return dbData;
}

// Helper: Get image dimensions
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
}
```

### 5. Supprimer une image

```typescript
async function deleteImage(item: MediaItem) {
  // 1. Delete from Storage
  const { error: storageError } = await supabase.storage
    .from('media-library')
    .remove([item.file_name]);
  
  if (storageError) throw storageError;
  
  // 2. Delete from Database
  const { error: dbError } = await supabase
    .from('media_library')
    .delete()
    .eq('id', item.id);
  
  if (dbError) throw dbError;
}
```

### 6. Mettre à jour les métadonnées

```typescript
async function updateMetadata(id: number, altText: string, caption: string, category: string) {
  const { data, error } = await supabase
    .from('media_library')
    .update({
      alt_text: altText,
      caption: caption,
      category: category
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
```

### 7. Désactiver une image (soft delete)

```typescript
async function deactivateImage(id: number) {
  const { error } = await supabase
    .from('media_library')
    .update({ is_active: false })
    .eq('id', id);
  
  if (error) throw error;
}
```

---

## 🎯 Exemples d'utilisation

### Exemple 1 : Galerie Portfolio

```tsx
'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function PortfolioGallery() {
  const [images, setImages] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadImages() {
      const { data } = await supabase
        .from('media_library')
        .select('*')
        .eq('category', 'portfolio')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      setImages(data || []);
    }
    loadImages();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map(img => (
        <div key={img.id} className="relative aspect-video">
          <img
            src={img.file_url}
            alt={img.alt_text}
            className="w-full h-full object-cover rounded-lg"
          />
          {img.caption && (
            <p className="mt-2 text-sm text-gray-600">{img.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Exemple 2 : Hook personnalisé

```tsx
// hooks/useMediaLibrary.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

interface UseMediaLibraryOptions {
  category?: string;
  limit?: number;
  orderBy?: 'created_at' | 'original_name';
  ascending?: boolean;
}

export function useMediaLibrary(options: UseMediaLibraryOptions = {}) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        let query = supabase
          .from('media_library')
          .select('*')
          .eq('is_active', true);
        
        if (options.category) {
          query = query.eq('category', options.category);
        }
        
        if (options.limit) {
          query = query.limit(options.limit);
        }
        
        const orderBy = options.orderBy || 'created_at';
        const ascending = options.ascending ?? false;
        query = query.order(orderBy, { ascending });
        
        const { data, error: queryError } = await query;
        
        if (queryError) throw queryError;
        setImages(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, [options.category, options.limit, options.orderBy, options.ascending]);

  return { images, loading, error };
}

// Utilisation
const { images, loading, error } = useMediaLibrary({ 
  category: 'portfolio', 
  limit: 6 
});
```

### Exemple 3 : Composant d'upload

```tsx
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const supabase = createClientComponentClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    try {
      setUploading(true);
      
      // Get dimensions
      const dimensions = await getImageDimensions(file);
      
      // Upload
      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop();
      const fileName = `portfolio/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // Get URL
      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(fileName);
      
      // Save to DB
      const { error: dbError } = await supabase
        .from('media_library')
        .insert({
          file_name: fileName,
          original_name: file.name,
          file_url: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          width: dimensions.width,
          height: dimensions.height,
          category: 'portfolio',
          is_active: true
        });
      
      if (dbError) throw dbError;
      
      alert('Image uploadée avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.src = URL.createObjectURL(file);
    });
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-sm"
      />
      {uploading && <p>Upload en cours...</p>}
    </div>
  );
}
```

### Exemple 4 : Sélecteur d'image

```tsx
'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface ImageSelectorProps {
  onSelect: (imageUrl: string) => void;
  category?: string;
}

export default function ImageSelector({ onSelect, category }: ImageSelectorProps) {
  const [images, setImages] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadImages() {
      let query = supabase
        .from('media_library')
        .select('*')
        .eq('is_active', true);
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data } = await query.order('created_at', { ascending: false });
      setImages(data || []);
    }
    loadImages();
  }, [category]);

  const handleSelect = (url: string) => {
    setSelected(url);
    onSelect(url);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map(img => (
        <button
          key={img.id}
          onClick={() => handleSelect(img.file_url)}
          className={`relative aspect-square border-2 rounded-lg overflow-hidden ${
            selected === img.file_url ? 'border-orange-600' : 'border-gray-300'
          }`}
        >
          <img
            src={img.file_url}
            alt={img.alt_text}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
```

---

## 🛠️ Fonctions utilitaires

### Format taille fichier

```typescript
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}
```

### Valider type image

```typescript
function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  return validTypes.includes(file.type);
}
```

### Nettoyer nom fichier

```typescript
function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
}
```

---

## 📋 Catégories disponibles

```typescript
const CATEGORIES = [
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'team', label: 'Équipe' },
  { value: 'services', label: 'Services' },
  { value: 'icons', label: 'Icônes' },
  { value: 'banners', label: 'Bannières' },
  { value: 'autres', label: 'Autres' }
];
```

---

**📚 Plus d'infos ?** Consultez `MEDIATHEQUE-COMPLETE.md`

---

*OFARO TECH - API Médiathèque v1.0*
