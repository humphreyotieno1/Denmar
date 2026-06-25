/**
 * Custom Cloudinary Loader for Next.js
 * Bypasses Vercel's serverless Image Optimization to avoid plan quota limits
 * by delegating compression, format conversion, and resizing to Cloudinary.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  // Only optimize Cloudinary images
  if (src.startsWith('https://res.cloudinary.com')) {
    const uploadMarker = 'image/upload/';
    const index = src.indexOf(uploadMarker);
    
    if (index !== -1) {
      const insertIndex = index + uploadMarker.length;
      const params = [
        `w_${width}`,
        `q_${quality || 75}`,
        'c_limit',
        'f_auto', // Automatically deliver modern formats (WebP, AVIF)
      ].join(',');
      
      const before = src.slice(0, insertIndex);
      const after = src.slice(insertIndex);
      
      return `${before}${params}/${after}`;
    }
  }
  
  // Return local static assets or non-Cloudinary images as-is
  return src;
}
