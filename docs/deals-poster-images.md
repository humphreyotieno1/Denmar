# Deals Popup Poster Image Specifications

## Recommended Image Size
**1200 × 800 pixels (3:2 aspect ratio)**

## Why This Size?

### Container Dimensions
- **Desktop**: ~768px wide × 600px tall
- **Tablet**: ~768px wide × 500px tall  
- **Mobile**: ~768px wide × 400px tall

### Image Requirements
- **Minimum width**: 1200px (for sharp display on all devices)
- **Aspect ratio**: 3:2 (works perfectly with `object-cover`)
- **File format**: JPEG (optimized) or WebP
- **File size**: Under 500KB recommended

## Design Guidelines

### Safe Zones
When designing your poster images, keep important content in these safe zones:

- **Top Safe Zone**: Avoid placing critical text/logo in top 20%
- **Center Safe Zone**: Main focus should be in center 50%
- **Bottom Safe Zone**: Title/subtitle area is bottom 25% with gradient overlay

### Text Overlay Area
The bottom portion (approximately 35% of the image height) will have a gradient overlay for text visibility:
- Dark gradient overlay from black/70 to transparent
- Content padding: `p-4` on mobile, `p-8` on desktop
- Title font size: 20px mobile → 36px desktop
- Subtitle font size: 14px mobile → 20px desktop

### What to Avoid
- ❌ Critical text/logos too close to edges
- ❌ Important faces/objects in top 20% of image
- ❌ Dark images (gradient will make it darker)
- ❌ Horizontal text in areas that may be cropped

### What Works Best
- ✅ Bright, colorful, high-contrast images
- ✅ Vertical composition that works at different croppings
- ✅ Key subject in center 60% of image
- ✅ Clear space at bottom for text overlay

## Alternative Dimensions (Not Recommended)

### 1440 × 900px (8:5 ratio)
- **Pros**: Higher resolution for 4K displays
- **Cons**: Slightly taller than container, more file size
- **Use case**: High-end displays, larger file acceptable

### 1080 × 720px (3:2 ratio)  
- **Pros**: Smaller file size
- **Cons**: May appear slightly soft on large screens
- **Use case**: File size constraints critical

### 1600 × 1067px (3:2 ratio)
- **Pros**: Excellent quality, wide compatibility
- **Cons**: Larger file size
- **Use case**: When image quality is top priority

## Current Poster Specifications

All posters should be designed at **1200 × 800 pixels** with these specifications:

```
Width: 1200px
Height: 800px
Aspect Ratio: 3:2
Resolution: 72-96 DPI (web standard)
Format: JPEG (quality 80-85) or WebP (quality 85)
Color Space: sRGB
Background: Not required (images use object-cover)
```

## Example Current Posters

1. `/deals/turkishairlines.jpeg`
2. `/deals/singapore.jpg` 
3. `/deals/christmas.jpg`

All should be updated to **1200 × 800px** for consistency.

## Testing Checklist

After creating a poster image:
- ✅ Check on mobile device (should fill 400px height nicely)
- ✅ Check on tablet (should fill 500px height nicely)
- ✅ Check on desktop (should fill 600px height nicely)
- ✅ Verify text readability with gradient overlay
- ✅ Ensure file size is under 500KB
- ✅ Test loading speed on slow 3G connection

