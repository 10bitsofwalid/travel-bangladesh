import { Navbar } from '../components/Navbar.js';
import { Card } from '../components/Card.js';
import { Footer } from '../components/Footer.js';
import { destinations } from '../data/destinations.js';

export class Destinations {
    constructor() {
        this.element = document.createElement('div');
        this.state = {
            search: '',
            category: 'All'
        };
    }

    render() {
        this.element.innerHTML = '';

        // Navbar
        const navbar = new Navbar();
        navbar.mount(this.element);

        // Page Header
        const header = document.createElement('div');
        header.className = 'page-header';
        header.innerHTML = `
            <div class="container">
                <h1 style="color: white; margin-bottom: 0.5rem;">Explore All Destinations</h1>
                <p style="color: rgba(255,255,255,0.8);">Find your next adventure from our curated list of spots.</p>
            </div>
        `;
        this.element.appendChild(header);

        // Main Content Container
        const container = document.createElement('div');
        container.className = 'container';
        this.element.appendChild(container);

        // Filters UI
        const filters = document.createElement('div');
        filters.className = 'filters-container';
        filters.innerHTML = `
            <input type="text" class="search-input" placeholder="Search destinations..." value="${this.state.search}">
            <div class="filter-group">
                <button class="filter-tag active" data-cat="All">All</button>
                <button class="filter-tag" data-cat="Sea">Sea</button>
                <button class="filter-tag" data-cat="Hills">Hills</button>
                <button class="filter-tag" data-cat="Forest">Forest</button>
                <button class="filter-tag" data-cat="Historical">Historical</button>
            </div>
        `;
        container.appendChild(filters);

        // Grid
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-3';
        grid.id = 'dest-grid';
        container.appendChild(grid);

        // Footer
        const footer = new Footer();
        footer.mount(this.element);

        // Logic
        this.renderGrid(grid);
        this.bindEvents(filters, grid);

        return this.element;
    }

    renderGrid(gridElement) {
        gridElement.innerHTML = '';

        const filtered = destinations.filter(d => {
            const matchSearch = d.name.toLowerCase().includes(this.state.search.toLowerCase());
            const matchCat = this.state.category === 'All' || d.stats.type === this.state.category;
            return matchSearch && matchCat;
        });

        if (filtered.length === 0) {
            gridElement.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">No destinations found matching your criteria.</div>';
            return;
        }

        filtered.forEach(dest => {
            const card = new Card(dest);
            card.mount(gridElement);
        });
    }

    bindEvents(filterContainer, gridElement) {
        const searchInput = filterContainer.querySelector('.search-input');
        const tags = filterContainer.querySelectorAll('.filter-tag');

        // Search
        searchInput.addEventListener('input', (e) => {
            this.state.search = e.target.value;
            this.renderGrid(gridElement);
        });

        // Category
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                tags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                this.state.category = tag.dataset.cat;
                this.renderGrid(gridElement);
            });
        });
    }
}
