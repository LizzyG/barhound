<template>
  <div class="relative h-full w-full">
    <div id="map" class="h-full w-full"></div>
    <div class="absolute top-4 right-4 z-[1000]">
      <button 
        @click="centerOnUserLocation" 
        class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        title="Center on your location"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref } from 'vue';
import { useBarStore } from '../../stores/barStore';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons in production
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const barStore = useBarStore();
const map = ref(null);
const markers = ref({});

// Initialize map
onMounted(() => {
  // Create map
  map.value = L.map('map').setView([barStore.currentLocation.lat, barStore.currentLocation.lng], 13);
  
  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map.value);
  
  // Add user location marker
  addUserLocationMarker();
  
  // Load bars
  barStore.fetchBars();
});

// Clean up on unmount
onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});

// Watch for changes in filtered bars
watch(() => barStore.filteredBars, (newBars) => {
  updateMarkers(newBars);
}, { deep: true });

// Watch for changes in selected bar
watch(() => barStore.selectedBar, (newSelectedBar) => {
  highlightSelectedMarker(newSelectedBar);
}, { deep: true });

// Watch for changes in user location
watch(() => barStore.currentLocation, (newLocation) => {
  if (map.value) {
    map.value.setView([newLocation.lat, newLocation.lng], 13);
    addUserLocationMarker();
  }
}, { deep: true });

// Add user location marker
function addUserLocationMarker() {
  // Remove existing user marker if it exists
  if (markers.value.userMarker) {
    map.value.removeLayer(markers.value.userMarker);
  }
  
  // Create user location marker with custom style
  markers.value.userMarker = L.circleMarker(
    [barStore.currentLocation.lat, barStore.currentLocation.lng],
    {
      radius: 8,
      fillColor: '#7C3AED',
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    }
  ).addTo(map.value);
}

// Update markers based on filtered bars
function updateMarkers(bars) {
  // Remove all existing bar markers
  Object.keys(markers.value).forEach(id => {
    if (id !== 'userMarker') {
      map.value.removeLayer(markers.value[id]);
      delete markers.value[id];
    }
  });
  
  // Add new markers for each bar
  bars.forEach(bar => {
    const marker = L.marker([bar.latitude, bar.longitude])
      .addTo(map.value)
      .bindPopup(`<strong>${bar.name}</strong><br>${bar.address}`);
    
    // Add click event to marker
    marker.on('click', () => {
      barStore.setSelectedBar(bar.id);
    });
    
    markers.value[bar.id] = marker;
  });
  
  // If there's a selected bar, highlight its marker
  if (barStore.selectedBar) {
    highlightSelectedMarker(barStore.selectedBar);
  }
}

// Highlight the selected marker
function highlightSelectedMarker(selectedBar) {
  // Reset all markers to default icon
  Object.keys(markers.value).forEach(id => {
    if (id !== 'userMarker') {
      markers.value[id].setIcon(DefaultIcon);
    }
  });
  
  // If there's a selected bar, highlight its marker
  if (selectedBar && markers.value[selectedBar.id]) {
    const highlightedIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [30, 49],
      iconAnchor: [15, 49],
      className: 'highlighted-marker'
    });
    
    markers.value[selectedBar.id].setIcon(highlightedIcon);
    markers.value[selectedBar.id].openPopup();
    
    // Pan to the selected marker
    map.value.panTo(markers.value[selectedBar.id].getLatLng());
  }
}

// Center map on user location
function centerOnUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        barStore.setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: 'Current Location'
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Using default location.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser. Using default location.');
  }
}
</script>

<style>
.highlighted-marker {
  filter: hue-rotate(120deg);
  z-index: 1000 !important;
}
</style> 