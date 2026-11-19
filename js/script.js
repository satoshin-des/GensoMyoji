document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById("search-input");
  const btn = document.getElementById("search-btn");
  const tbody = document.getElementById('search-res');
  const jsonPath = btn.dataset.jsonUrl;
  
  let cachedDat = null; // data for cache

  async function search() {
    const q = input.value.trim();
    tbody.innerHTML = '';

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

    m.forEach(e => {
      const tr = document.createElement('tr');

      const tdMyoji = document.createElement('td');
      tdMyoji.textContent = e.name;
    
      tr.appendChild(tdMyoji);

      const ys = e.ruby;
      ys.forEach(d => {
        tdYomi = document.createElement('td');
        tdYomi.textContent = d;
        tr.appendChild(tdYomi);
      });

      tbody.appendChild(tr);
    });
  }

  btn.addEventListener('click', search);
});
