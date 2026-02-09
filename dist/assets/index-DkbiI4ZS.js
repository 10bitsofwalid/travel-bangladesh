(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class m{constructor(){this.element=this.createDOM(),this.bindEvents()}createDOM(){const e=document.createElement("nav");return e.className="navbar",e.innerHTML=`
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
        `,e}bindEvents(){const e=this.element.querySelector(".mobile-menu-btn"),t=this.element.querySelector(".nav-links");e.addEventListener("click",()=>{t.classList.toggle("active"),e.textContent=t.classList.contains("active")?"✕":"☰"}),window.addEventListener("scroll",()=>{window.scrollY>50?this.element.classList.add("scrolled"):this.element.classList.remove("scrolled")})}mount(e){e.appendChild(this.element)}}class v{constructor(){this.element=this.createDOM()}createDOM(){const e=document.createElement("section");return e.className="hero",e.style.backgroundColor="#0F4C75",e.innerHTML=`
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
        `,e}mount(e){e.appendChild(this.element)}}class u{constructor(e){this.data=e,this.element=this.createDOM()}createDOM(){const e=document.createElement("article");e.className="card";const t=this.data.image||"https://via.placeholder.com/400x250?text=Destination";return e.innerHTML=`
            <img src="${t}" alt="${this.data.name}" class="card-image" loading="lazy">
            <div class="card-content">
                <div class="card-meta">
                    <span style="background: var(--color-accent); padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; color: var(--color-primary); font-weight: 600;">${this.data.stats.type}</span>
                    <span class="rating">★ 4.8</span>
                </div>
                <h3 class="card-title">${this.data.name}</h3>
                <p class="card-desc">${this.data.description.substring(0,80)}...</p>
                <div class="card-footer">
                    <span style="font-weight: 600; font-size: 0.9rem; color: var(--color-text-main);">${this.data.stats.cost}</span>
                    <a href="#destination/${this.data.id}" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem; text-decoration: none;">Details</a>
                </div>
            </div>
        `,e}mount(e){e.appendChild(this.element)}}class p{constructor(){this.element=this.createDOM()}createDOM(){const e=document.createElement("footer");return e.style.backgroundColor="#0F4C75",e.style.color="white",e.style.padding="var(--spacing-xl) 0",e.style.marginTop="var(--spacing-xl)",e.innerHTML=`
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
        `,e}mount(e){e.appendChild(this.element)}}const h=[{id:"coxs-bazar",name:"Cox's Bazar",coordinates:{lat:21.4272,lon:91.9676},description:"The longest natural sea beach in the world, stretching 120 km with golden sand and gentle waves.",stats:{bestTime:"Nov - Feb",cost:"$50 - $150 / day",type:"Sea"},image:"/images/coxs-bazar.jpg"},{id:"sajek-valley",name:"Sajek Valley",coordinates:{lat:23.3815,lon:92.2936},description:"Known as the 'Queen of Hills', offers a surreal experience of floating above the clouds.",stats:{bestTime:"Sep - Mar",cost:"$40 - $100 / day",type:"Hills"},image:"/images/sajek.jpg"},{id:"sundarbans",name:"Sundarbans",coordinates:{lat:21.9497,lon:89.1833},description:"The largest mangrove forest on earth, home to the majestic Royal Bengal Tiger.",stats:{bestTime:"Oct - Mar",cost:"$80 - $200 / tour",type:"Forest"},image:"/images/sundarbans.jpg"},{id:"sylhet",name:"Sylhet",coordinates:{lat:24.8917,lon:91.8667},description:"Land of Two Leaves and a Bud, famous for tea gardens and Ratargul Swamp Forest.",stats:{bestTime:"Jun - Sep",cost:"$40 - $100 / day",type:"Forest"},image:"/images/sylhet.jpg"},{id:"saint-martin",name:"Saint Martin's Island",coordinates:{lat:20.6272,lon:92.3226},description:"Bangladesh's only coral island, featuring crystal clear blue water and fresh seafood.",stats:{bestTime:"Nov - Mar",cost:"$60 - $120 / day",type:"Sea"},image:"/images/saint-martin.jpg"},{id:"bandarban",name:"Bandarban",coordinates:{lat:22.1931,lon:92.2185},description:"A paradise for trekking enthusiasts, featuring the highest peaks and diverse indigenous cultures.",stats:{bestTime:"Sep - Jan",cost:"$30 - $80 / day",type:"Hills"},image:"/images/bandarban.jpg"}];class f{constructor(){this.element=document.createElement("div")}render(){this.element.innerHTML="",new m().mount(this.element),new v().mount(this.element);const a=document.createElement("section");a.className="container py-xl",a.innerHTML=`
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
        `,this.element.appendChild(a);const s=a.querySelector("#featured-grid");h.slice(0,3).forEach(r=>{new u(r).mount(s)});const i=document.createElement("section");return i.style.backgroundColor="#f0f4f8",i.className="py-xl",i.innerHTML=`
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
        `,this.element.appendChild(i),new p().mount(this.element),this.element}}class b{constructor(){this.element=document.createElement("div"),this.state={search:"",category:"All"}}render(){this.element.innerHTML="",new m().mount(this.element);const t=document.createElement("div");t.className="page-header",t.innerHTML=`
            <div class="container">
                <h1 style="color: white; margin-bottom: 0.5rem;">Explore All Destinations</h1>
                <p style="color: rgba(255,255,255,0.8);">Find your next adventure from our curated list of spots.</p>
            </div>
        `,this.element.appendChild(t);const a=document.createElement("div");a.className="container",this.element.appendChild(a);const s=document.createElement("div");s.className="filters-container",s.innerHTML=`
            <input type="text" class="search-input" placeholder="Search destinations..." value="${this.state.search}">
            <div class="filter-group">
                <button class="filter-tag active" data-cat="All">All</button>
                <button class="filter-tag" data-cat="Sea">Sea</button>
                <button class="filter-tag" data-cat="Hills">Hills</button>
                <button class="filter-tag" data-cat="Forest">Forest</button>
                <button class="filter-tag" data-cat="Historical">Historical</button>
            </div>
        `,a.appendChild(s);const i=document.createElement("div");return i.className="grid grid-cols-3",i.id="dest-grid",a.appendChild(i),new p().mount(this.element),this.renderGrid(i),this.bindEvents(s,i),this.element}renderGrid(e){e.innerHTML="";const t=h.filter(a=>{const s=a.name.toLowerCase().includes(this.state.search.toLowerCase()),i=this.state.category==="All"||a.stats.type===this.state.category;return s&&i});if(t.length===0){e.innerHTML='<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">No destinations found matching your criteria.</div>';return}t.forEach(a=>{new u(a).mount(e)})}bindEvents(e,t){const a=e.querySelector(".search-input"),s=e.querySelectorAll(".filter-tag");a.addEventListener("input",i=>{this.state.search=i.target.value,this.renderGrid(t)}),s.forEach(i=>{i.addEventListener("click",()=>{s.forEach(n=>n.classList.remove("active")),i.classList.add("active"),this.state.category=i.dataset.cat,this.renderGrid(t)})})}}class y{constructor(e){this.id=e,this.destination=h.find(t=>t.id===this.id),this.element=document.createElement("div")}render(){if(this.element.innerHTML="",new m().mount(this.element),!this.destination)return this.renderError(),this.element;const{name:t,image:a,description:s,stats:i}=this.destination,n=document.createElement("div");n.className="details-hero",n.style.background=`url(${a}) center/cover no-repeat`,n.innerHTML=`
            <div class="container" style="position: relative; z-index: 2;">
                <span style="background: var(--color-accent); color: var(--color-primary); padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;">${i.type}</span>
                <h1 style="color: white; margin-top: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${t}</h1>
            </div>
        `,this.element.appendChild(n);const r=document.createElement("div");r.className="container details-wrapper",this.element.appendChild(r);const l=document.createElement("main");l.className="details-main",l.innerHTML=`
            <div class="info-grid">
                <div class="info-item">
                    <label>Best Season</label>
                    <span>${i.bestTime}</span>
                </div>
                <div class="info-item">
                    <label>Estimated Cost</label>
                    <span>${i.cost}</span>
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
            <p>${s}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            <h3 class="mt-xl mb-md">Top Attractions</h3>
            <ul style="list-style: disc; padding-left: 1.5rem; line-height: 2;">
                <li>Sunrise Viewpoint</li>
                <li>Local Cultural Museum</li>
                <li>Traditional Market</li>
                <li>Boat Ride Experience</li>
            </ul>
        `,r.appendChild(l);const d=document.createElement("aside");return d.className="details-sidebar",d.innerHTML=`
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
        `,r.appendChild(d),new p().mount(this.element),this.bindEvents(d),this.element}renderError(){this.element.innerHTML=`
            <div class="container" style="padding-top: 100px; text-align: center;">
                <h2>Destination Not Found</h2>
                <a href="#destinations" class="btn btn-primary mt-md">Back to Directory</a>
            </div>
        `}bindEvents(e){const t=e.querySelector("#add-to-trip"),a=t.textContent;t.addEventListener("click",()=>{t.textContent="Added to Trip! ✓",t.style.backgroundColor="#2ecc71";const s=JSON.parse(localStorage.getItem("myTrip"))||[];s.some(i=>i===this.id)||(s.push(this.id),localStorage.setItem("myTrip",JSON.stringify(s))),setTimeout(()=>{t.textContent=a,t.style.backgroundColor=""},2e3)})}}class x{constructor(){this.element=document.createElement("div"),this.trips=JSON.parse(localStorage.getItem("myTrip"))||[]}render(){this.element.innerHTML="",new m().mount(this.element);const t=document.createElement("div");t.className="page-header",t.innerHTML=`
            <div class="container">
                <h1 style="color: white; margin-bottom: 0.5rem;">My Trip Planner</h1>
                <p style="color: rgba(255,255,255,0.8);">Manage your saved destinations and estimate your budget.</p>
            </div>
        `,this.element.appendChild(t);const a=document.createElement("div");return a.className="container",a.style.minHeight="60vh",this.element.appendChild(a),this.trips.length===0?a.innerHTML=`
                <div style="text-align: center; padding: 4rem 0;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">✈️</div>
                    <h2 class="mb-md">Your trip list is empty</h2>
                    <p class="mb-lg">Start exploring destinations and add them to your plan.</p>
                    <a href="#destinations" class="btn btn-primary">Explore Destinations</a>
                </div>
            `:this.renderTripList(a),new p().mount(this.element),this.element}renderTripList(e){const t=document.createElement("div");t.className="grid grid-cols-1 gap-lg";let a=0,s=0;const i=this.trips.map(n=>{const r=h.find(d=>d.id===n);if(!r)return null;const l=r.stats.cost.match(/\$(\d+)\s-\s\$(\d+)/);return l&&(a+=parseInt(l[1]),s+=parseInt(l[2])),`
                <div style="display: flex; gap: 1rem; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); align-items: center;">
                    <img src="${r.image}" style="width: 100px; height: 80px; object-fit: cover; border-radius: 4px;">
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.2rem;">${r.name}</h3>
                        <p class="text-small">${r.stats.cost}</p>
                    </div>
                    <button class="btn btn-secondary remove-btn" data-id="${r.id}" style="border-color: #e74c3c; color: #e74c3c; padding: 4px 12px; font-size: 0.8rem;">Remove</button>
                    <a href="#destination/${r.id}" class="btn btn-primary" style="font-size: 0.8rem; padding: 6px 16px;">View</a>
                </div>
            `}).filter(Boolean).join("");e.innerHTML=`
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                <div>
                    <h2 class="mb-md">Saved Locations (${this.trips.length})</h2>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${i}
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
                            <strong>$${a} - $${s}</strong>
                        </div>
                        <div style="background: #e1f5fe; padding: 1rem; border-radius: 4px; font-size: 0.9rem; margin-bottom: 1rem;">
                            <strong>Tip:</strong> This estimation is based on daily costs. Don't forget travel and accommodation!
                        </div>
                        <button class="btn btn-primary" style="width: 100%;" onclick="alert('Booking feature coming soon!')">Proceed to Book</button>
                    </div>
                </div>
            </div>
        `,e.querySelectorAll(".remove-btn").forEach(n=>{n.addEventListener("click",r=>{const l=r.target.dataset.id;this.removeTrip(l)})})}removeTrip(e){this.trips=this.trips.filter(t=>t!==e),localStorage.setItem("myTrip",JSON.stringify(this.trips)),this.render()}}const c=document.getElementById("app"),g=()=>{c.innerHTML="";const o=window.location.hash;if(o==="#destinations"){const e=new b;c.appendChild(e.render())}else if(o.startsWith("#destination/")){const e=o.split("/")[1],t=new y(e);c.appendChild(t.render())}else if(o==="#planner"){const e=new x;c.appendChild(e.render())}else{const e=new f;c.appendChild(e.render())}window.scrollTo(0,0)};window.addEventListener("hashchange",g);document.addEventListener("DOMContentLoaded",g);
