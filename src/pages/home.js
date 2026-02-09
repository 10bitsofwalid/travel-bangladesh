import { Navbar } from '../components/Navbar.js';
import { Hero } from '../components/Hero.js';
import { Card } from '../components/Card.js';
import { Footer } from '../components/Footer.js';
import { destinations } from '../data/destinations.js';

export class Home {
    constructor() {
        this.element = document.createElement('div');
    }

    render() {
        this.element.innerHTML = ''; // limited cleanup

        // Navbar
        const navbar = new Navbar();
        navbar.mount(this.element);

        // Hero
        const hero = new Hero();
        hero.mount(this.element);

        // Featured Destinations Section
        const featuredSection = document.createElement('section');
        featuredSection.className = 'container py-xl';
        featuredSection.innerHTML = `
            <div class="flex justify-between items-center mb-lg">
                <div>
                    <h2 class="section-title">Popular Destinations</h2>
                    <p>Discover the most visited places this season.</p>
                </div>
                <a href="#all-destinations" class="btn btn-secondary">View All</a>
            </div>
            <div class="grid grid-cols-3" id="featured-grid">
                <!-- Cards injected here -->
            </div>
        `;
        this.element.appendChild(featuredSection);

        // Inject Cards (Top 3 or 6)
        const grid = featuredSection.querySelector('#featured-grid');
        destinations.slice(0, 3).forEach(dest => {
            const card = new Card(dest);
            card.mount(grid);
        });

        // Why Choose Us Section
        const valueSection = document.createElement('section');
        valueSection.style.backgroundColor = '#f0f4f8';
        valueSection.className = 'py-xl';
        valueSection.innerHTML = `
            <div class="container text-center">
                <h2 class="mb-lg">Why Travel with Us?</h2>
                <div class="grid grid-cols-3 gap-lg">
                    <div class="value-item">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">🛡️</div>
                        <h3>Trusted Guides</h3>
                        <p>We work with certified local guides to ensure safe and authentic experiences.</p>
                    </div>
                    <div class="value-item">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">৳</div>
                        <h3>Best Prices</h3>
                        <p>Transparent pricing with no hidden fees. Get the best value for your budget.</p>
                    </div>
                    <div class="value-item">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">📅</div>
                        <h3>Easy Planning</h3>
                        <p>Build your itinerary, book hotels, and manage everything in one place.</p>
                    </div>
                </div>
            </div>
        `;
        this.element.appendChild(valueSection);

        // Footer
        const footer = new Footer();
        footer.mount(this.element);

        return this.element;
    }
}
