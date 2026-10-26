export interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: 'image/webp' | 'image/jpeg';
  aspectRatio?: 'original' | '4:3' | '16:9' | '1:1';
  culinaryTone?: 'natural' | 'warm-atelier' | 'crisp-contrast';
}

export interface OptimizationResult {
  dataUrl: string;
  blob: Blob;
  originalSize: number; // bytes
  optimizedSize: number; // bytes
  savingsPercent: number;
  originalWidth: number;
  originalHeight: number;
  optimizedWidth: number;
  optimizedHeight: number;
  format: string;
  durationMs: number;
  filename: string;
}

/**
 * Optimizes a raw/high-resolution food photo directly in the browser:
 * - Downsamples large megapixels (e.g. 24MP-48MP camera images) to optimal web gallery dimensions
 * - Encodes to modern low-latency WebP (or JPEG)
 * - Strips unnecessary EXIF metadata to minimize latency
 * - Optional culinary color enhancement tuned for fine dining plating
 */
export async function optimizeFoodPhoto(
  file: File,
  options: OptimizeOptions = {}
): Promise<OptimizationResult> {
  const startTime = performance.now();

  const maxWidth = options.maxWidth || 1600;
  const maxHeight = options.maxHeight || 1200;
  const quality = options.quality ?? 0.82;
  const preferredFormat = options.format || 'image/webp';
  const aspectRatioMode = options.aspectRatio || 'original';
  const culinaryTone = options.culinaryTone || 'natural';

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image data'));
      img.onload = () => {
        try {
          const originalWidth = img.naturalWidth;
          const originalHeight = img.naturalHeight;

          // Determine target dimensions
          let targetWidth = originalWidth;
          let targetHeight = originalHeight;

          // If aspect ratio is enforced, calculate source crop rect
          let sx = 0;
          let sy = 0;
          let sWidth = originalWidth;
          let sHeight = originalHeight;

          if (aspectRatioMode === '4:3') {
            const targetRatio = 4 / 3;
            const currentRatio = originalWidth / originalHeight;
            if (currentRatio > targetRatio) {
              sWidth = originalHeight * targetRatio;
              sx = (originalWidth - sWidth) / 2;
            } else {
              sHeight = originalWidth / targetRatio;
              sy = (originalHeight - sHeight) / 2;
            }
          } else if (aspectRatioMode === '16:9') {
            const targetRatio = 16 / 9;
            const currentRatio = originalWidth / originalHeight;
            if (currentRatio > targetRatio) {
              sWidth = originalHeight * targetRatio;
              sx = (originalWidth - sWidth) / 2;
            } else {
              sHeight = originalWidth / targetRatio;
              sy = (originalHeight - sHeight) / 2;
            }
          } else if (aspectRatioMode === '1:1') {
            const size = Math.min(originalWidth, originalHeight);
            sx = (originalWidth - size) / 2;
            sy = (originalHeight - size) / 2;
            sWidth = size;
            sHeight = size;
          }

          // Calculate downscale preserving target aspect ratio
          const cropRatio = sWidth / sHeight;
          if (sWidth > maxWidth || sHeight > maxHeight) {
            if (sWidth / maxWidth > sHeight / maxHeight) {
              targetWidth = maxWidth;
              targetHeight = Math.round(maxWidth / cropRatio);
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(maxHeight * cropRatio);
            }
          } else {
            targetWidth = Math.round(sWidth);
            targetHeight = Math.round(sHeight);
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d', { alpha: false });

          if (!ctx) {
            throw new Error('Canvas 2D context unavailable');
          }

          // High quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Optional culinary toning
          if (culinaryTone === 'warm-atelier') {
            // Subtle warm champagne tint & slight contrast to enhance golden sear & sauce luster
            ctx.filter = 'contrast(1.04) brightness(1.02) saturate(1.06)';
          } else if (culinaryTone === 'crisp-contrast') {
            ctx.filter = 'contrast(1.08) brightness(1.01) saturate(1.02)';
          } else {
            ctx.filter = 'none';
          }

          // Draw cropped & downsampled image onto canvas
          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

          // Test WebP support with fallback
          let outputFormat = preferredFormat;
          let dataUrl = canvas.toDataURL(outputFormat, quality);

          // If browser does not support webp, fallback to jpeg
          if (outputFormat === 'image/webp' && !dataUrl.startsWith('data:image/webp')) {
            outputFormat = 'image/jpeg';
            dataUrl = canvas.toDataURL(outputFormat, quality);
          }

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to generate optimized image blob'));
                return;
              }

              const optimizedSize = blob.size;
              const originalSize = file.size;
              const savingsPercent = Math.max(
                0,
                Math.round(((originalSize - optimizedSize) / originalSize) * 100)
              );
              const durationMs = Math.round(performance.now() - startTime);

              const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
              const ext = outputFormat === 'image/webp' ? 'webp' : 'jpg';
              const filename = `${nameWithoutExt}_web_optimized.${ext}`;

              resolve({
                dataUrl,
                blob,
                originalSize,
                optimizedSize,
                savingsPercent,
                originalWidth,
                originalHeight,
                optimizedWidth: targetWidth,
                optimizedHeight: targetHeight,
                format: outputFormat.split('/')[1].toUpperCase(),
                durationMs,
                filename,
              });
            },
            outputFormat,
            quality
          );
        } catch (err) {
          reject(err);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes into human readable KB / MB
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
