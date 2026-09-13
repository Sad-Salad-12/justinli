'use strict';
// Thin portfolio adapter; the demo renderer and examples come from Verba itself.
const portfolioQuery = new URLSearchParams(location.search);
document.documentElement.dataset.embed = String(portfolioQuery.get('embed') === '1');
const requestedParent = portfolioQuery.get('parentOrigin');
const portfolioParentOrigin = requestedParent === 'https://sad-salad-12.github.io' ? requestedParent : location.origin;
if (window.parent !== window) {
  const brief = document.getElementById('brief');
  const fitBrief = () => {
    brief.style.height = 'auto';
    brief.style.height = `${brief.scrollHeight + 2}px`;
  };
  brief.addEventListener('input', fitBrief);
  document.getElementById('scenarios').addEventListener('change', fitBrief);
  document.getElementById('reset-sample').addEventListener('click', fitBrief);
  fitBrief();
  let lastHeight = 0;
  const resizePortfolioFrame = () => {
    const height = Math.ceil(document.body.getBoundingClientRect().height);
    if (height > 0 && height !== lastHeight) {
      lastHeight = height;
      window.parent.postMessage({ type: 'verba:resize', height }, portfolioParentOrigin);
    }
  };
  let lastWidth = 0;
  new ResizeObserver(() => {
    const width = brief.clientWidth;
    if (width !== lastWidth) { lastWidth = width; fitBrief(); }
    resizePortfolioFrame();
  }).observe(document.body);
  window.addEventListener('load', resizePortfolioFrame);
  window.addEventListener('message', event => {
    if (event.origin !== portfolioParentOrigin || event.source !== window.parent || event.data?.type !== 'verba:measure') return;
    lastHeight = 0;
    fitBrief();
    resizePortfolioFrame();
  });
  document.fonts.ready.then(() => { fitBrief(); resizePortfolioFrame(); });
  resizePortfolioFrame();
}
