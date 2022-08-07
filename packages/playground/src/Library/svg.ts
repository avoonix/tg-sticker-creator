export const svgToDataUri = (svg: string) =>
  `data:image/svg+xml;base64,${btoa(svg)}`;

export const wrapPathInSvg = (path: string) => {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="512" height="512" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
  <path style="fill:#ff00ff;fill-opacity:1;stroke:none;stroke-width:1;stroke-opacity:1" d="${path}" />
</svg>`;
};
