import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { destinations } from '../data/destinations.js';

export class Details {
    constructor(id) {
        this.id = id;
        this.destination = destinations.find(d => d.id === this.id);
        this.element = document.createElement('div');
    }

    render() {
        this.element.innerHTML = '';

        // Navbar
        const navbar = new Navbar();
        navbar.mount(this.element);

        if (!this.destination) {
            this.renderError();
            return this.element;
        }

        const { name, image, description, stats } = this.destination;

        // Hero
        const hero = document.createElement('div');
        hero.className = 'details-hero';
        hero.style.background = `url(${image}) center/cover no-repeat`;
        hero.innerHTML = `
            <div class="container" style="position: relative; z-index: 2;">
                <span style="background: var(--color-accent); color: var(--color-primary); padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;">${stats.type}</span>
                <h1 style="color: white; margin-top: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${name}</h1>
            </div>
        `;
        this.element.appendChild(hero);

        // Content Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'container details-wrapper';
        this.element.appendChild(wrapper);

        // Main Content
        const main = document.createElement('main');
        main.className = 'details-main';
        main.innerHTML = `
            <div class="info-grid">
                <div class="info-item">
                    <label>Best Season</label>
                    <span>${stats.bestTime}</span>
                </div>
                <div class="info-item">
                    <label>Estimated Cost</label>
                    <span>${stats.cost}</span>
                </div>
                <div class="info-item">
                    <label>Duration</label>
                    <span>3 Days / 2 Nights</span>
                </div>
                <div class="info-item">
                    <label>Difficuity</label>
                    <span>Moderate</span>
                </div>
            </div>

            <h3 class="mb-md">Overview</h3>
            <p>${description}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            <h3 class="mt-xl mb-md">Top Attractions</h3>
            <ul style="list-style: disc; padding-left: 1.5rem; line-height: 2;">
                <li>Sunrise Viewpoint</li>
                <li>Local Cultural Museum</li>
                <li>Traditional Market</li>
                <li>Boat Ride Experience</li>
            </ul>
        `;
        wrapper.appendChild(main);

        // Sidebar
        const sidebar = document.createElement('aside');
        sidebar.className = 'details-sidebar';
        sidebar.innerHTML = `
            <div class="sidebar-widget">
                <h3 style="font-size: 1.25rem;">Plan Your Trip</h3>
                <p class="text-small mb-md">Add this destination to your travel list to start planning.</p>
                <button id="add-to-trip" class="btn btn-primary" style="width: 100%;">Add to My Trip</button>
            </div>
            
            <div class="sidebar-widget">
                <h3 style="font-size: 1.25rem;">Location</h3>
                <div style="background: #eee; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 4px; color: #777;">
                    Map Placeholder
                </div>
            </div>
        `;
        wrapper.appendChild(sidebar);

        // Footer
        const footer = new Footer();
        footer.mount(this.element);

        this.bindEvents(sidebar);

        return this.element;
    }

    renderError() {
        this.element.innerHTML = `
            <div class="container" style="padding-top: 100px; text-align: center;">
                <h2>Destination Not Found</h2>
                <a href="#destinations" class="btn btn-primary mt-md">Back to Directory</a>
            </div>
        `;
    }

    bindEvents(container) {
        const btn = container.querySelector('#add-to-trip');
        const defaultText = btn.textContent;

        btn.addEventListener('click', () => {
            // Mock functionality
            btn.textContent = 'Added to Trip! ✓';
            btn.style.backgroundColor = '#2ecc71';

            // Save to localStorage (simple impl)
            const currentTrips = JSON.parse(localStorage.getItem('myTrip')) || [];
            if (!currentTrips.some(id => id === this.id)) {
                currentTrips.push(this.id);
                localStorage.setItem('myTrip', JSON.stringify(currentTrips));
            }

            setTimeout(() => {
                btn.textContent = defaultText;
                btn.style.backgroundColor = '';
            }, 2000);
        });
    }
}
