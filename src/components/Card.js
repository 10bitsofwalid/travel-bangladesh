export class Card {
    constructor(data) {
        this.data = data;
        this.element = this.createDOM();
    }

    createDOM() {
        const article = document.createElement('article');
        article.className = 'card';

        // Placeholder mechanism if image fails or is missing
        const imageSrc = this.data.image || 'https://via.placeholder.com/400x250?text=Destination';

        article.innerHTML = `
            <img src="${imageSrc}" alt="${this.data.name}" class="card-image" loading="lazy">
            <div class="card-content">
                <div class="card-meta">
                    <span style="background: var(--color-accent); padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; color: var(--color-primary); font-weight: 600;">${this.data.stats.type}</span>
                    <span class="rating">★ 4.8</span>
                </div>
                <h3 class="card-title">${this.data.name}</h3>
                <p class="card-desc">${this.data.description.substring(0, 80)}...</p>
                <div class="card-footer">
                    <span style="font-weight: 600; font-size: 0.9rem; color: var(--color-text-main);">${this.data.stats.cost}</span>
                    <a href="#destination/${this.data.id}" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem; text-decoration: none;">Details</a>
                </div>
            </div>
        `;

        // Add click listener for details if needed
        return article;
    }

    mount(parent) {
        parent.appendChild(this.element);
    }
}
