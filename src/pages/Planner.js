import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { destinations } from '../data/destinations.js';

export class Planner {
    constructor() {
        this.element = document.createElement('div');
        this.trips = JSON.parse(localStorage.getItem('myTrip')) || [];
    }

    render() {
        this.element.innerHTML = '';

        // Navbar
        const navbar = new Navbar();
        navbar.mount(this.element);

        // Header
        const header = document.createElement('div');
        header.className = 'page-header'; // Reuse style
        header.innerHTML = `
            <div class="container">
                <h1 style="color: white; margin-bottom: 0.5rem;">My Trip Planner</h1>
                <p style="color: rgba(255,255,255,0.8);">Manage your saved destinations and estimate your budget.</p>
            </div>
        `;
        this.element.appendChild(header);

        // Content
        const container = document.createElement('div');
        container.className = 'container';
        container.style.minHeight = '60vh';
        this.element.appendChild(container);

        if (this.trips.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem 0;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">✈️</div>
                    <h2 class="mb-md">Your trip list is empty</h2>
                    <p class="mb-lg">Start exploring destinations and add them to your plan.</p>
                    <a href="#destinations" class="btn btn-primary">Explore Destinations</a>
                </div>
            `;
        } else {
            this.renderTripList(container);
        }

        // Footer
        const footer = new Footer();
        footer.mount(this.element);

        return this.element;
    }

    renderTripList(container) {
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 gap-lg';

        // Calculate Total Budget (Mock)
        let minTotal = 0;
        let maxTotal = 0;

        const tripItems = this.trips.map(id => {
            const dest = destinations.find(d => d.id === id);
            if (!dest) return null;

            // Parse cost " $50 - $150 / day" -> 50, 150
            const costMatch = dest.stats.cost.match(/\$(\d+)\s-\s\$(\d+)/);
            if (costMatch) {
                minTotal += parseInt(costMatch[1]);
                maxTotal += parseInt(costMatch[2]);
            }

            return `
                <div style="display: flex; gap: 1rem; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); align-items: center;">
                    <img src="${dest.image}" style="width: 100px; height: 80px; object-fit: cover; border-radius: 4px;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.2rem;">${dest.name}</h3>
                        <p class="text-small">${dest.stats.cost}</p>
                    </div>
                    <button class="btn btn-secondary remove-btn" data-id="${dest.id}" style="border-color: #e74c3c; color: #e74c3c; padding: 4px 12px; font-size: 0.8rem;">Remove</button>
                    <a href="#destination/${dest.id}" class="btn btn-primary" style="font-size: 0.8rem; padding: 6px 16px;">View</a>
                </div>
            `;
        }).filter(Boolean).join('');

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                <div>
                    <h2 class="mb-md">Saved Locations (${this.trips.length})</h2>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${tripItems}
                    </div>
                </div>
                <div>
                    <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: sticky; top: 100px;">
                        <h3 class="mb-md">Trip Summary</h3>
                        <div class="flex justify-between mb-sm">
                            <span>Destinations</span>
                            <strong>${this.trips.length}</strong>
                        </div>
                        <div class="flex justify-between mb-lg">
                            <span>Est. Daily Budget</span>
                            <strong>$${minTotal} - $${maxTotal}</strong>
                        </div>
                        <div style="background: #e1f5fe; padding: 1rem; border-radius: 4px; font-size: 0.9rem; margin-bottom: 1rem;">
                            <strong>Tip:</strong> This estimation is based on daily costs. Don't forget travel and accommodation!
                        </div>
                        <button class="btn btn-primary" style="width: 100%;" onclick="alert('Booking feature coming soon!')">Proceed to Book</button>
                    </div>
                </div>
            </div>
        `;

        // Bind Remove Events
        container.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                this.removeTrip(id);
            });
        });
    }

    removeTrip(id) {
        this.trips = this.trips.filter(t => t !== id);
        localStorage.setItem('myTrip', JSON.stringify(this.trips));
        this.render(); // Re-render
    }
}
