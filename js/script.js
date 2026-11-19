document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById("search-input");
  const btn = document.getElementById("search-btn");
  const resTab = document.getElementById('search-res');
  const jsonPath = "{{ '/json/myoji-data.json' | relative_url }}";
  
  let cachedDat = null; // data for cache

  async function search() {
    const q = input.value.trim();
    resTab.innerHTML = '';

    if (!q) {
      return;
    }

    if (!cachedDat) {
      const res = await fetch(jsonPath);
      cachedDat = await res.json();
    }

    const m = cachedDat.filter(a => a.name.includes(q));

    if (m.length === 0) {
      resTab.innerHTML = '';
      return;
    }
  }

  btn.addEventListener('click', search);
});
