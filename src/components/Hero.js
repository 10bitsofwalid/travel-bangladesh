export class Hero {
    constructor() {
        this.element = this.createDOM();
    }

    createDOM() {
        const section = document.createElement('section');
        section.className = 'hero';
        // Fallback or placeholder background logic could go here if needed
        section.style.backgroundColor = '#0F4C75';

        section.innerHTML = `
            <div class="container hero-content">
                <h1 class="hero-title">Experience the Natural Beauty of Bangladesh</h1>
                <p class="hero-subtitle">
                    From the world's longest sea beach to the largest mangrove forest. 
                    Discover hidden gems, plan your perfect trip, and create unforgettable memories.
                </p>
                <div class="flex gap-md">
                    <a href="#destinations" class="btn btn-primary" style="background-color: var(--color-secondary); border: none;">Explore Destinations</a>
                    <a href="#planner" class="btn btn-secondary" style="border-color: white; color: white;">Plan Your Trip</a>
                </div>
            </div>
        `;
        return section;
    }

    mount(parent) {
        parent.appendChild(this.element);
    }
}
