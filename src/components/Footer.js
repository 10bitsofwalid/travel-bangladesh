export class Footer {
    constructor() {
        this.element = this.createDOM();
    }

    createDOM() {
        const footer = document.createElement('footer');
        footer.style.backgroundColor = '#0F4C75';
        footer.style.color = 'white';
        footer.style.padding = 'var(--spacing-xl) 0';
        footer.style.marginTop = 'var(--spacing-xl)';

        footer.innerHTML = `
            <div class="container grid grid-cols-4 gap-lg">
                <div class="footer-col">
                    <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">TravelBD</h3>
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                        Your trusted guide to exploring the beautiful landscapes and culture of Bangladesh.
                    </p>
                </div>
                
                <div class="footer-col">
                    <h4 style="color: white; font-size: 1.1rem;">Quick Links</h4>
                    <ul style="opacity: 0.8; font-size: 0.9rem; line-height: 2;">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Destinations</a></li>
                        <li><a href="#">Travel Tips</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4 style="color: white; font-size: 1.1rem;">Destinations</h4>
                    <ul style="opacity: 0.8; font-size: 0.9rem; line-height: 2;">
                        <li><a href="#">Cox's Bazar</a></li>
                        <li><a href="#">Sylhet</a></li>
                        <li><a href="#">Sundarbans</a></li>
                        <li><a href="#">Bandarban</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4 style="color: white; font-size: 1.1rem;">Newsletter</h4>
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 1rem;">
                        Subscribe for travel updates and offers.
                    </p>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="email" placeholder="Your email" style="padding: 8px; border-radius: 4px; border: none; flex: 1;">
                        <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem;">Join</button>
                    </div>
                </div>
            </div>
            <div class="container" style="margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; text-align: center; font-size: 0.8rem; opacity: 0.6;">
                &copy; 2026 TravelBD. All rights reserved.
            </div>
        `;
        return footer;
    }

    mount(parent) {
        parent.appendChild(this.element);
    }
}
