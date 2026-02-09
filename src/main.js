import { Home } from './pages/Home.js';
import { Destinations } from './pages/Destinations.js';
import { Details } from './pages/Details.js';
import { Planner } from './pages/Planner.js';

const app = document.getElementById('app');

const router = () => {
    app.innerHTML = '';
    const hash = window.location.hash;

    if (hash === '#destinations') {
        const page = new Destinations();
        app.appendChild(page.render());
    } else if (hash.startsWith('#destination/')) {
        const id = hash.split('/')[1];
        const page = new Details(id);
        app.appendChild(page.render());
    } else if (hash === '#planner') {
        const page = new Planner();
        app.appendChild(page.render());
    } else {
        const page = new Home();
        app.appendChild(page.render());
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
};

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);