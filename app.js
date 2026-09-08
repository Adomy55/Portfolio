// Shared helpers used by every page.
// The "database" is data.js, a plain <script> that sets window.SITE_DATA.
// Using a <script> tag (instead of fetch('data.json')) is the important part:
// browsers block fetch() of local files when a page is opened by double-click
// (file:// URLs), which is what was causing "fails to load". A <script src="data.js">
// tag has no such restriction, so the site works whether it's hosted or opened directly.

async function loadData() {
  if (window.SITE_DATA) return window.SITE_DATA;
  // Fallback for anyone still using the older data.json + fetch setup on a real server.
  const res = await fetch('data.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not find data.js or data.json next to this page');
  return res.json();
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function categoryById(data, id) {
  return data.categories.find(c => c.id === id);
}

function projectById(data, id) {
  return data.projects.find(p => p.id === id);
}

function projectsByCategory(data, catId) {
  return data.projects.filter(p => p.category === catId);
}

// Navigates after letting a door-open animation play, so the click always feels physical.
function goThroughDoor(unitEl, href) {
  if (!unitEl) { window.location.href = href; return; }
  unitEl.classList.add('opening');
  window.setTimeout(() => { window.location.href = href; }, 320);
}
