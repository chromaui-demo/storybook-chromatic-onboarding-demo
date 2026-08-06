export const viewportOptions = {
  compact: {
    name: 'Compact · 360px',
    styles: { width: '360px', height: '800px' },
    type: 'mobile',
  },
  breakpoint: {
    name: 'Breakpoint · 640px',
    styles: { width: '640px', height: '900px' },
    type: 'tablet',
  },
  desktop: {
    name: 'Desktop · 1200px',
    styles: { width: '1200px', height: '900px' },
    type: 'desktop',
  },
} as const;

export const responsiveModes = {
  'compact 360px': { viewport: 'compact' },
  'breakpoint 640px': { viewport: 'breakpoint' },
  'desktop 1200px': { viewport: 'desktop' },
} as const;
