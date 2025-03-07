<template>
  <div class="bg-white shadow-sm rounded-lg p-3">
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-base font-bold">Filters</h2>
      <button 
        @click="resetFilters" 
        class="text-xs text-gray-500 hover:text-primary"
      >
        Clear All
      </button>
    </div>
    
    <!-- Core Attributes -->
    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-sm text-gray-700">Features</h3>
      <div class="space-y-1.5">
        <div class="flex items-center">
          <input 
            id="liveMusic" 
            type="checkbox" 
            v-model="filters.liveMusic"
            class="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="liveMusic" class="ml-2 text-sm text-gray-700">Live Music</label>
        </div>
        
        <div class="flex items-center">
          <input 
            id="dogFriendly" 
            type="checkbox" 
            v-model="filters.dogFriendly"
            class="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="dogFriendly" class="ml-2 text-sm text-gray-700">Dog Friendly</label>
        </div>
        
        <div class="flex items-center">
          <input 
            id="poolTables" 
            type="checkbox" 
            v-model="filters.poolTables"
            class="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="poolTables" class="ml-2 text-sm text-gray-700">Pool Tables</label>
        </div>
        
        <div class="flex items-center">
          <input 
            id="happyHour" 
            type="checkbox" 
            v-model="filters.happyHour"
            class="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="happyHour" class="ml-2 text-sm text-gray-700">Happy Hour</label>
        </div>
        
        <div class="flex items-center">
          <input 
            id="outdoorSeating" 
            type="checkbox" 
            v-model="filters.outdoorSeating"
            class="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="outdoorSeating" class="ml-2 text-sm text-gray-700">Outdoor Seating</label>
        </div>
        
        <div class="flex items-center">
          <input 
            id="sportsViewing" 
            type="checkbox" 
            v-model="filters.sportsViewing"
            class="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="sportsViewing" class="ml-2 text-sm text-gray-700">Sports Viewing</label>
        </div>
      </div>
    </div>
    
    <!-- Distance Filter -->
    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-sm text-gray-700">Distance</h3>
      <div>
        <input 
          type="range" 
          min="1" 
          max="20" 
          step="1" 
          v-model="maxDistance"
          class="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 mile</span>
          <span>{{ maxDistance }} miles</span>
        </div>
      </div>
    </div>
    
    <!-- Price Filter -->
    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-sm text-gray-700">Price</h3>
      <div class="flex space-x-1">
        <button 
          @click="setPriceLevel(1)" 
          :class="[
            'px-2 py-1 border rounded-md text-xs',
            filters.priceLevel === 1 ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-700'
          ]"
        >
          $
        </button>
        <button 
          @click="setPriceLevel(2)" 
          :class="[
            'px-2 py-1 border rounded-md text-xs',
            filters.priceLevel === 2 ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-700'
          ]"
        >
          $$
        </button>
        <button 
          @click="setPriceLevel(3)" 
          :class="[
            'px-2 py-1 border rounded-md text-xs',
            filters.priceLevel === 3 ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-700'
          ]"
        >
          $$$
        </button>
        <button 
          @click="setPriceLevel(4)" 
          :class="[
            'px-2 py-1 border rounded-md text-xs',
            filters.priceLevel === 4 ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-700'
          ]"
        >
          $$$$
        </button>
      </div>
    </div>
    
    <!-- Rating Filter -->
    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-sm text-gray-700">Rating</h3>
      <div class="flex space-x-1">
        <button 
          v-for="rating in [3, 3.5, 4, 4.5]" 
          :key="rating"
          @click="setMinRating(rating)" 
          :class="[
            'px-2 py-1 border rounded-md text-xs',
            filters.minRating === rating ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-700'
          ]"
        >
          {{ rating }}+ ★
        </button>
      </div>
    </div>
    
    <!-- Open Now Filter -->
    <div class="mb-2">
      <h3 class="font-semibold mb-2 text-sm text-gray-700">Hours</h3>
      <div class="flex items-center">
        <input 
          id="openNow" 
          type="checkbox" 
          v-model="filters.openNow"
          class="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label for="openNow" class="ml-2 text-sm text-gray-700">Open Now</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBarStore } from '../../stores/barStore';

const barStore = useBarStore();

// Create a reactive reference to the filters in the store
const filters = computed(() => barStore.filters);

// Helper for the distance slider
const maxDistance = computed({
  get: () => barStore.filters.maxDistance || 5,
  set: (value) => barStore.setFilter('maxDistance', parseInt(value))
});

// Reset all filters
const resetFilters = () => {
  barStore.resetFilters();
};

// Set price level filter
const setPriceLevel = (level) => {
  if (barStore.filters.priceLevel === level) {
    barStore.setFilter('priceLevel', null);
  } else {
    barStore.setFilter('priceLevel', level);
  }
};

// Set minimum rating filter
const setMinRating = (rating) => {
  if (barStore.filters.minRating === rating) {
    barStore.setFilter('minRating', null);
  } else {
    barStore.setFilter('minRating', rating);
  }
};
</script> 