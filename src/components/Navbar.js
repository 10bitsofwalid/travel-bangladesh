export function Navbar(){
    
    const nav = document.createElement('nav');
    nav.className  = 'navbar';

    nav.innerHTML = `

    <div>
        <a href="#">Home</a>
        <a href="#">Explore</a>
        <a href="#">Destination</a>
    </div>
`;

return nav;
}