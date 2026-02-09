export class Navbar {
    constructor() {
        this.element = this.createDOM();
        this.bindEvents();
    }

    createDOM() {
        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.innerHTML = `
            <div class="container nav-container">
                <a href="/" class="logo">
                    <span>🇧🇩</span> TravelBD
                </a>
                <button class="mobile-menu-btn" aria-label="Toggle Menu">☰</button>
                <ul class="nav-links">
                    <li><a href="#destinations" class="nav-link">Destinations</a></li>
                    <li><a href="#planner" class="nav-link">Plan Trip</a></li>
                    <li><a href="#" class="nav-link">Stories</a></li>
                    <li><a href="#destinations" class="btn btn-primary" style="padding: 8px 20px;">Book Now</a></li>
                </ul>
            </div>
        `;
        return nav;
    }

    bindEvents() {
        const btn = this.element.querySelector('.mobile-menu-btn');
        const links = this.element.querySelector('.nav-links');

        btn.addEventListener('click', () => {
            links.classList.toggle('active');
            btn.textContent = links.classList.contains('active') ? '✕' : '☰';
        });

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.element.classList.add('scrolled');
            } else {
                this.element.classList.remove('scrolled');
            }
        });
    }

    mount(parent) {
        parent.appendChild(this.element);
    }
}
