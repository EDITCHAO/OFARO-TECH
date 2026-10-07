/**
 * Utilitaires pour le recadrage et la compression d'images
 */

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 * Crée une image recadrée à partir d'une URL et d'une zone de recadrage
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CroppedArea,
  outputSize: number = 512
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Impossible de créer le contexte canvas');
  }

  // Définir la taille du canvas (carré)
  canvas.width = outputSize;
  canvas.height = outputSize;

  // Dessiner l'image recadrée et redimensionnée
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize
  );

  // Convertir le canvas en blob avec compression
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Erreur lors de la création du blob'));
        }
      },
      'image/jpeg',
      0.92 // Qualité JPEG (92% pour un bon équilibre qualité/taille)
    );
  });
}

/**
 * Crée un élément Image à partir d'une URL
 */
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

/**
 * Convertit un Blob en File
 */
export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}

/**
 * Lit un fichier et retourne une URL de données
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.addEventListener('error', reject);
    reader.readAsDataURL(file);
  });
}
