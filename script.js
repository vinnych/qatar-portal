// Automated Data Aggregation (RSS Feeds for Classifieds, Properties, Jobs)
const rssFeeds = [
    { url: "https://www.aljazeera.com/xml/rss/all.xml", type: "News" }, // Reliable Al Jazeera Feed
    { url: "https://propertyfinder.qa/blog/feed/", type: "Property" }, // Property Finder Blog
];

let aggregatedListings = [];

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    fetchWeather();
    fetchPrayerTimes();
    fetchLiveNews();
    renderListings();
});

// APIs
async function fetchWeather() {
    try {
        const res = await fetch('https://wttr.in/Doha?format=j1', { cache: "no-store", signal: AbortSignal.timeout(5000) });
        if (!res.ok) throw new Error("HTTP Status " + res.status);
        const data = await res.json();
        const temp = data.current_condition[0].temp_C;
        const weatherEl = document.getElementById('weather-value');
        weatherEl.textContent = `${temp}°C (Doha)`;
        weatherEl.setAttribute('aria-label', `Current temperature is ${temp} degrees Celsius in Doha`);
    } catch (err) {
        console.error("Weather fetch failed:", err);
        // Fallback
        const weatherEl = document.getElementById('weather-value');
        weatherEl.textContent = "28°C (Doha)";
        weatherEl.setAttribute('aria-label', `Current temperature is estimated 28 degrees Celsius in Doha due to network error`);
    }
}

async function fetchPrayerTimes() {
    try {
        const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Doha&country=Qatar&method=8', { signal: AbortSignal.timeout(5000) });
        if (!res.ok) throw new Error("HTTP Status " + res.status);
        const data = await res.json();
        const timings = data.data.timings;
        const prayerEl = document.getElementById('prayer-value');
        prayerEl.innerHTML = `Maghrib: ${timings.Maghrib} | Isha: ${timings.Isha}`;
        prayerEl.setAttribute('aria-label', `Next prayers are Maghrib at ${timings.Maghrib} and Isha at ${timings.Isha}`);
    } catch (err) {
        console.error("Prayer fetch failed:", err);
        document.getElementById('prayer-value').textContent = "Unavailable";
    }
}

async function fetchLiveNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Fetching latest news...</p>`;

    try {
        const rssUrl = "https://www.aljazeera.com/xml/rss/all.xml";

        // Use our new Vercel Serverless Function Backend
        const proxyUrl = `/api/feed?url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
        if (!response.ok) throw new Error("Vercel Backend response was not ok");

        const data = await response.json();
        if (data.status !== 'ok') throw new Error("Backend parse failed");

        const items = data.items;
        let html = "";
        for (let i = 0; i < Math.min(3, items.length); i++) {
            const item = items[i];

            // Backend already normalized these fields
            const title = item.title;
            const link = item.link;
            const pubDate = item.pubDate;
            const imageUrl = item.image;

            // Description isn't parsed by our simple regex proxy, so we omit or fake it for layout
            const desc = "Latest update from Al Jazeera News desk.";

            html += `
                <div class="card">
                    <div class="card-img-wrapper">
                        <span class="badge news">Live Update</span>
                        <img src="${imageUrl}" alt="${title}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1594916892556-b08e33f3cbf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-desc">${desc}</p>
                        <div class="card-meta">
                            <span><i data-lucide="clock" class="icon-sm" style="display:inline; vertical-align:middle; width:14px; margin-right:4px;"></i><span aria-label="Published on ${pubDate}">${pubDate}</span></span>
                            <a href="${link}" target="_blank" rel="noopener noreferrer" style="color:var(--primary-light); font-weight:500;" aria-label="Read more about ${title}">Read More</a>
                        </div>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
        if (typeof lucide !== 'undefined') lucide.createIcons();

    } catch (err) {
        console.error("Live news fetch failed, using fallback:", err);
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--accent);" aria-live="polite">Showing offline updates. Live feed unavailable.</p>`;
        if (typeof renderNewsMockFallback !== 'undefined') renderNewsMockFallback(container);
    }
}

// avoiding blocked public CORS proxies for the frontend-only prototype
const mockListings = [
    {
        id: 1,
        title: "Luxury 2BHK Apartment in The Pearl with Marina View",
        location: "The Pearl, Doha",
        price: "9,500 QAR/month",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "Property",
        details: "2 Beds • 3 Baths • 120 sqm",
        link: "https://www.propertyfinder.qa/en/buy/apartments-for-sale-in-the-pearl-qatar.html"
    },
    {
        id: 2,
        title: "Toyota Land Cruiser GXR V8 2022 - Perfect Condition",
        location: "Salwa Road",
        price: "245,000 QAR",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "Vehicle",
        details: "35,000 km • White • Full Options",
        link: "https://www.qatarclassifieds.com/vehicles"
    },
    {
        id: 3,
        title: "Senior Software Engineer - React/Node.js",
        location: "West Bay, Doha",
        price: "18k - 25k QAR",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "Job",
        details: "Full Time • Tech • 5+ years exp",
        link: "https://www.bayt.com/en/qatar/jobs/"
    },
    {
        id: 4,
        title: "Sony PlayStation 5 with 2 Controllers & Games",
        location: "Al Sadd",
        price: "1,800 QAR",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "Classifieds",
        details: "Electronics • Used - Like New",
        link: "https://www.qatarclassifieds.com/electronics"
    },
    {
        id: 5,
        title: "Spacious Villa in Al Waab - Perfect for Families",
        location: "Al Waab",
        price: "14,000 QAR/month",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "Property",
        details: "5 Beds • 6 Baths • Maid Room",
        link: "https://www.propertyfinder.qa/en/rent/villas-for-rent-in-qatar.html"
    },
    {
        id: 6,
        title: "iPhone 14 Pro Max 256GB Deep Purple",
        location: "Mansoura",
        price: "3,500 QAR",
        image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "Classifieds",
        details: "Mobiles • Warranty Valid",
        link: "https://www.qatarclassifieds.com/mobiles"
    }
];

// The fetchAggregatedData function is no longer needed as we are using mockListings.
// async function fetchAggregatedData() {
//     const container = document.getElementById('listings-container');
//     if (!container) return;

//     container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Aggregating live listings...</p>`;

//     try {
//         const fetchPromises = rssFeeds.map(async (feed) => {
//             // Using a more reliable open source RSS to JSON converter
//             const proxyUrl = `https://api.factmaven.com/xml-to-json/?xml=${encodeURIComponent(feed.url)}`;
//             const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });

//             if (!response.ok) return [];
//             const data = await response.json();

//             // FactMaven returns the JSON representation of the XML
//             const channel = data.rss?.channel || data.feed;
//             if (!channel) return [];

//             let items = channel.item || channel.entry || [];
//             if (!Array.isArray(items)) items = [items];

//             return items.slice(0, 3).map(item => {
//                 const titleStr = typeof item.title === 'string' ? item.title : (item.title?.text || "Update");
//                 const linkStr = typeof item.link === 'string' ? item.link : (item.link?.href || "#");
//                 const dateStr = item.pubDate || item.published || new Date().toISOString();
//                 const pubDate = new Date(dateStr).toLocaleDateString();

//                 let imageUrl = "https://images.unsplash.com/photo-1594916892556-b08e33f3cbf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

//                 // Try to find image in enclosure or media:content if it exists
//                 if (item.enclosure && item.enclosure.url) imageUrl = item.enclosure.url;
//                 else if (item['media:content'] && item['media:content'].url) imageUrl = item['media:content'].url;

//                 return {
//                     id: Math.random().toString(36).substr(2, 9),
//                     title: titleStr,
//                     location: "Qatar",
//                     price: "View Details",
//                     image: imageUrl,
//                     type: feed.type,
//                     details: pubDate,
//                     link: linkStr
//                 };
//             });
//         });

//         const results = await Promise.all(fetchPromises);
//         aggregatedListings = results.flat().filter(item => item !== null);

//         // Add one static car fallback to ensure visual variety since automotive RSS is scarce
//         aggregatedListings.push({
//             id: 'static-car',
//             title: "Toyota Land Cruiser GXR V8 2022",
//             location: "Salwa Road",
//             price: "245,000 QAR",
//             image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//             type: "Vehicle",
//             details: "Featured Ad",
//             link: "#"
//         });

//         renderListings();

//     } catch (err) {
//         console.error("Aggregation failed:", err);
//         container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--accent);">Failed to load live listings. Network offline.</p>`;
//     }
// }

function renderListings() {
    const container = document.getElementById('listings-container');
    if (!container) return;

    container.innerHTML = mockListings.map(item => `
        <div class="card">
            <div class="card-img-wrapper">
                <span class="badge" style="background:${getBadgeColor(item.type)}">${item.type}</span>
                <img src="${item.image}" alt="${item.title}" class="card-img">
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc" style="color:var(--text-primary); font-weight:500;"><i data-lucide="map-pin" class="icon-sm" style="display:inline; vertical-align:middle; width:14px; margin-right:4px;"></i>${item.location}</p>
                <p class="card-desc" style="margin-bottom:0.5rem;">${item.details}</p>
                
                <div class="card-meta" style="margin-top:auto;">
                    <span class="price" style="font-size: 1rem;">${item.price}</span>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;" aria-label="View details for ${item.title}">View</a>
                </div>
            </div>
        </div>
    `).join('');

    // Re-initialize icons for newly added HTML
    lucide.createIcons();
}

function getBadgeColor(type) {
    switch (type) {
        case 'Property': return '#4f46e5'; // Indigo
        case 'Vehicle': return '#ef4444'; // Red
        case 'Job': return '#10b981'; // Emerald
        case 'Classifieds': return '#f59e0b'; // Amber
        default: return '#6b7280'; // Gray
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        this.classList.add('active');

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust for sticky header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Search button functionality
const searchInput = document.querySelector('.search-box input');
const searchCategory = document.querySelector('.search-category');
const searchBtn = document.querySelector('.btn-search');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput ? searchInput.value.trim() : '';
        const category = searchCategory ? searchCategory.value : 'all';
        if (!query) {
            searchInput.focus();
            searchInput.placeholder = 'Please enter something to search...';
            return;
        }
        const searchUrls = {
            properties: `https://www.propertyfinder.qa/en/search?q=${encodeURIComponent(query)}`,
            jobs: `https://www.bayt.com/en/qatar/jobs/?query=${encodeURIComponent(query)}`,
            classifieds: `https://www.qatarclassifieds.com/search?q=${encodeURIComponent(query)}`,
            all: `https://www.google.com/search?q=${encodeURIComponent(query + ' Qatar')}`
        };
        const url = searchUrls[category] || searchUrls.all;
        window.open(url, '_blank', 'noopener,noreferrer');
    });

    // Allow pressing Enter to search
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') searchBtn.click();
        });
    }
}

// Post an Ad button
const postAdBtn = document.querySelector('[aria-label="Post a new ad"]');
if (postAdBtn) {
    postAdBtn.addEventListener('click', () => {
        alert('Post an Ad feature coming soon! You will be able to list your properties, vehicles, and classifieds here.');
    });
}

// Sign In button
const signInBtn = document.querySelector('[aria-label="Sign in to your account"]');
if (signInBtn) {
    signInBtn.addEventListener('click', () => {
        alert('Sign In feature coming soon! User authentication will be added in the next phase.');
    });
}
