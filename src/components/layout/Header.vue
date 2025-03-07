<template>
  <header class="bg-white shadow-sm">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <span class="text-xl font-bold text-primary">BarHound</span>
      </router-link>
      
      <!-- Navigation -->
      <nav class="hidden md:flex space-x-6">
        <router-link to="/" class="text-gray-700 hover:text-primary">Home</router-link>
        <router-link to="/about" class="text-gray-700 hover:text-primary">About</router-link>
      </nav>
      
      <!-- Location Selector -->
      <div class="flex items-center">
        <button 
          @click="getCurrentLocation" 
          class="flex items-center text-sm text-gray-700 hover:text-primary"
        >
          <span class="mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          {{ locationText }}
        </button>
        
        <!-- Data Source Toggle (only visible in development) -->
        <div v-if="isDevelopment" class="ml-4 flex items-center">
          <span class="text-xs text-gray-500 mr-2">Data:</span>
          <button 
            @click="toggleDataSource" 
            class="text-xs px-2 py-1 rounded"
            :class="dataSourceClass"
          >
            {{ dataSource }}
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMobileMenu" 
        class="md:hidden text-gray-700 hover:text-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
      <div class="container mx-auto px-4 py-2">
        <router-link to="/" class="block py-1 text-gray-700 hover:text-primary">Home</router-link>
        <router-link to="/about" class="block py-1 text-gray-700 hover:text-primary">About</router-link>
        
        <!-- Data Source Toggle in Mobile Menu -->
        <div v-if="isDevelopment" class="py-1 flex items-center">
          <span class="text-xs text-gray-500 mr-2">Data Source:</span>
          <button 
            @click="toggleDataSource" 
            class="text-xs px-2 py-1 rounded"
            :class="dataSourceClass"
          >
            {{ dataSource }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBarStore } from '../../stores/barStore';

const barStore = useBarStore();
const mobileMenuOpen = ref(false);

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Get the current data source
const dataSource = computed(() => barStore.dataSource);

// Styling for the data source button
const dataSourceClass = computed(() => {
  return dataSource.value === 'sample' 
    ? 'bg-blue-100 text-blue-800' 
    : 'bg-green-100 text-green-800';
});

const locationText = computed(() => {
  return barStore.currentLocation.name || 'Portland, OR';
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const getCurrentLocation = () => {
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
      }
    );
  }
};

// Toggle between sample data and Supabase
const toggleDataSource = () => {
  barStore.toggleDataSource();
};
</script> 