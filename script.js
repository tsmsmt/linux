// basic map settings
const map = L.map('radar-map', {
    center: [35.6892, 51.3890],
    zoom: 2,
    zoomControl: false,
    attributionControl: false,
    doubleClickZoom: false,
    dragging: false
});

// add map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5,
    minZoom: 2
}).addTo(map);

// target indicator
const targetMarker = L.marker([0, 0], {
    icon: L.divIcon({
        className: 'target-icon',
        html: '<div class="target-pulse"></div>',
        iconSize: [20, 20]
    })
}).addTo(map);

// random deviation function
function randomOffset(lat, lon) {
    const offsetLat = lat + (Math.random() * 8 - 5); // width
    const offsetLon = lon + (Math.random() * 6 - 5); // length
    return [offsetLat, offsetLon];
}

// get and display user location
async function trackTarget() {
    try {
        const res = await fetch('https://ipinfo.io/json?');
        const data = await res.json();

        const [latStr, lonStr] = data.loc.split(',');
        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);

        document.getElementById('target-id').textContent = data.ip;
        document.getElementById('target-coords').textContent = `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;
        document.getElementById('target-location').textContent = `${data.city || 'unknown'}, ${data.country || 'unknown'}`;

        // update marker
        targetMarker.setLatLng([lat, lon]);

        // adjusting the map center with random deviation
        const [offsetLat, offsetLon] = randomOffset(lat, lon);
        map.setView([offsetLat, offsetLon], 4);

        document.querySelector('.target-marker').style.display = 'block';

        map.whenReady(() => {
            setTimeout(() => {
                updateMarkerPosition(lat, lon);
            }, 300);
        });

    } catch (error) {
        console.error('Tracking error:', error);
        const lat = 35.6892;
        const lon = 51.3890;

        document.getElementById('target-id').textContent = 'UNKNOWN';
        document.getElementById('target-location').textContent = 'Iran';

        targetMarker.setLatLng([lat, lon]);

        const [offsetLat, offsetLon] = randomOffset(lat, lon);
        map.setView([offsetLat, offsetLon], 4);

        document.querySelector('.target-marker').style.display = 'block';

        map.whenReady(() => {
            setTimeout(() => {
                updateMarkerPosition(lat, lon);
            }, 300);
        });
    }
}

// update marker position
function updateMarkerPosition(lat, lon) {
    const marker = document.querySelector('.target-marker');
    const point = map.latLngToContainerPoint([lat, lon]);

    marker.style.left = `${point.x}px`;
    marker.style.top = `${point.y}px`;
    marker.style.display = 'block';
}

//
window.addEventListener('resize', () => {
    const coords = targetMarker.getLatLng();
    if (coords) {
        updateMarkerPosition(coords.lat, coords.lng);
    }
});

//
map.on('moveend', () => {
    const coords = targetMarker.getLatLng();
    if (coords) {
        updateMarkerPosition(coords.lat, coords.lng);
    }
});

map.on('zoomend', () => {
    const coords = targetMarker.getLatLng();
    if (coords) {
        updateMarkerPosition(coords.lat, coords.lng);
    }
});

// start traking
trackTarget();

// match sweeparm and pulse point
// null

//open and colse terminal
// select the required elements
const terminalIcon = document.getElementById('terminalIcon');
const terminalWrapper = document.getElementById('terminalWrapper');
const closeBtn = document.querySelector('.btn-color2');
const container = document.querySelector('.container2');

// terminal status (open or closed)
let isTerminalOpen = false;


// function to open terminal
function openTerminal() {
    terminalWrapper.style.display = 'flex';
    setTimeout(() => {
        terminalWrapper.classList.add('active');
        container.style.transform = 'scale(0)';
        container.style.opacity = '0';

        // start animation
        setTimeout(() => {
            container.style.animation = 'container-expand 0.4s ease-out forwards';
        }, 10);

        isTerminalOpen = true;
    }, 10);
}

// function to close terminal
function closeTerminal() {
    container.style.animation = 'none';
    container.style.transform = 'scale(0)';
    container.style.opacity = '0';

    setTimeout(() => {
        terminalWrapper.classList.remove('active');
        setTimeout(() => {
            terminalWrapper.style.display = 'none';
            isTerminalOpen = false;
        }, 300);
    }, 300);
}

// click event for terminal icon
terminalIcon.addEventListener('click', function (e) {
    e.preventDefault();

    if (isTerminalOpen) {
        closeTerminal();
    } else {
        openTerminal();
    }
});

// click event for the close button (orange dot)
closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    closeTerminal();
});

// function to close terminal with animation
function closeTerminal() {
    terminalWrapper.classList.add('closing');
    container.style.animation = 'container-collapse 0.4s ease-in forwards';

    setTimeout(() => {
        terminalWrapper.classList.remove('active', 'closing');
        terminalWrapper.style.display = 'none';
        isTerminalOpen = false;
        // reset animations for next open
        container.style.animation = '';
    }, 400);
}


// reload page
document.getElementById("linuxI").addEventListener("click", function () {
    location.reload(); // refresh page
});



// open terminal
window.openTerminal = function () {
    terminalWrapper.style.display = 'flex';
    setTimeout(() => {
        terminalWrapper.classList.add('active');
        container.style.transform = 'scale(0)';
        container.style.opacity = '0';

        setTimeout(() => {
            container.style.animation = 'container-expand 0.4s ease-out forwards';
        }, 10);

        isTerminalOpen = true;
    }, 10);
};
