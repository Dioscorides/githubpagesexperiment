document.addEventListener('DOMContentLoaded', () => {
    let allData = [];
    const loader = document.getElementById('loader');
    
    // UI Elements
    const tableBody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('searchInput');
    const nationSelect = document.getElementById('nationSelect');
    const iiifCheck = document.getElementById('iiifCheck');
    const freeCheck = document.getElementById('freeCheck');
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    // Stats Elements
    const statTotal = document.getElementById('statTotal');
    const statNations = document.getElementById('statNations');
    const statIIIF = document.getElementById('statIIIF');
    const showingCount = document.getElementById('showingCount');

    // 1. Fetch Data
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load data");
            return response.json();
        })
        .then(data => {
            // Sort alphabetically by Library Name initially
            allData = data.sort((a, b) => a.library.localeCompare(b.library));
            
            initializeDashboard();
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500); // Smooth fade out
        })
        .catch(err => {
            loader.innerHTML = `<div class="text-danger text-center"><i class="bi bi-exclamation-triangle fs-1"></i><p class="mt-2">Error loading data.json<br><small>${err.message}</small></p></div>`;
        });

    function initializeDashboard() {
        populateNationFilter();
        updateStats(allData);
        renderTable(allData);
    }

    // 2. Render Table
    function renderTable(data) {
        tableBody.innerHTML = '';
        
        if (data.length === 0) {
            tableBody.parentElement.classList.add('d-none'); // Hide table
            emptyState.classList.remove('d-none');
            showingCount.innerText = 0;
            return;
        }

        tableBody.parentElement.classList.remove('d-none');
        emptyState.classList.add('d-none');

        const fragment = document.createDocumentFragment();

        data.forEach(item => {
            const row = document.createElement('tr');
            
            // Logic for Badges
            let badges = '';
            if (item.iiif === true) {
                badges += `<span class="badge badge-feature bg-iiif me-1" title="International Image Interoperability Framework"><i class="bi bi-images me-1"></i>IIIF</span>`;
            }
            if (item.is_free_cultural_works_license === true) {
                badges += `<span class="badge badge-feature bg-free" title="Free Cultural Works License"><i class="bi bi-unlock me-1"></i>Open</span>`;
            }
            if (!badges) {
                badges = `<span class="text-muted small fst-italic">Standard Access</span>`;
            }

            // Website handling
            const websiteBtn = item.website 
                ? `<a href="${item.website}" target="_blank" class="btn btn-sm btn-outline-primary rounded-pill">Visit <i class="bi bi-arrow-right-short"></i></a>`
                : `<span class="text-muted small">No URL</span>`;

            row.innerHTML = `
                <td>
                    <div class="library-name">${item.library}</div>
                </td>
                <td>
                    <div class="fw-medium">${item.nation}</div>
                    <div class="city-name"><i class="bi bi-dot"></i> ${item.city}</div>
                </td>
                <td>${badges}</td>
                <td class="text-end">${websiteBtn}</td>
            `;
            fragment.appendChild(row);
        });

        tableBody.appendChild(fragment);
        showingCount.innerText = data.length; // Approximate visible count
    }

    // 3. Stats Logic
    function updateStats(data) {
        // Calculate Total Active Libraries
        statTotal.innerText = data.length;

        // Calculate Unique Nations
        const uniqueNations = new Set(data.map(item => item.nation));
        statNations.innerText = uniqueNations.size;

        // Calculate IIIF Count
        const iiifCount = data.filter(item => item.iiif === true).length;
        statIIIF.innerText = iiifCount;
    }

    // 4. Populate Dropdown
    function populateNationFilter() {
        // Extract unique nations, sort them
        const nations = [...new Set(allData.map(item => item.nation))].sort();
        
        nations.forEach(nation => {
            const option = document.createElement('option');
            option.value = nation;
            option.textContent = nation;
            nationSelect.appendChild(option);
        });
    }

    // 5. Filter Engine
    function filterData() {
        const term = searchInput.value.toLowerCase();
        const selectedNation = nationSelect.value;
        const requireIIIF = iiifCheck.checked;
        const requireFree = freeCheck.checked;

        const filtered = allData.filter(item => {
            // Search Text
            const matchesSearch = (item.library && item.library.toLowerCase().includes(term)) || 
                                  (item.city && item.city.toLowerCase().includes(term));
            
            // Nation Filter
            const matchesNation = selectedNation === 'All' || item.nation === selectedNation;

            // Checkbox Filters
            const matchesIIIF = !requireIIIF || item.iiif === true;
            const matchesFree = !requireFree || item.is_free_cultural_works_license === true;

            return matchesSearch && matchesNation && matchesIIIF && matchesFree;
        });

        renderTable(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterData);
    nationSelect.addEventListener('change', filterData);
    iiifCheck.addEventListener('change', filterData);
    freeCheck.addEventListener('change', filterData);
    
    if(clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            searchInput.value = '';
            nationSelect.value = 'All';
            iiifCheck.checked = false;
            freeCheck.checked = false;
            filterData();
        });
    }
});