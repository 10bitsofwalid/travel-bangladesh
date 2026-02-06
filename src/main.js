import './styles/globals.css';
import { Navbar } from './components/Navbar.js';
import { Home } from './pages/home.js';

const app = document.getElementById('app');

app.appendChild(Navbar());
app.appendChild(Home());