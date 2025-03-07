<template>
  <div 
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    :class="{ 'ring-2 ring-primary': isSelected }"
  >
    <!-- Image -->
    <div class="relative h-48 bg-gray-200">
      <img 
        :src="bar.photoUrl" 
        :alt="bar.name" 
        class="w-full h-full object-cover"
      />
      <div class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-bold flex items-center">
        <span class="text-yellow-500 mr-1">★</span>
        {{ bar.rating }}
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-4">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-bold text-gray-800">{{ bar.name }}</h3>
        <span class="text-sm text-gray-500">{{ bar.distance }} mi</span>
      </div>
      
      <p class="text-gray-600 text-sm mt-1">{{ bar.address }}</p>
      
      <!-- Attribute Chips -->
      <div class="mt-3 flex flex-wrap gap-2">
        <span 
          v-if="bar.attributes.liveMusic" 
          class="attribute-chip attribute-chip-live-music"
        >
          🎵 Live Music
        </span>
        <span 
          v-if="bar.attributes.dogFriendly" 
          class="attribute-chip attribute-chip-dog-friendly"
        >
          🐕 Dog Friendly
        </span>
        <span 
          v-if="bar.attributes.poolTables" 
          class="attribute-chip attribute-chip-pool-tables"
        >
          🎱 Pool Tables
        </span>
        <span 
          v-if="bar.attributes.happyHour" 
          class="attribute-chip attribute-chip-happy-hour"
        >
          🍹 Happy Hour
        </span>
        <span 
          v-if="bar.attributes.outdoorSeating" 
          class="attribute-chip attribute-chip-outdoor-seating"
        >
          🌳 Outdoor Seating
        </span>
        <span 
          v-if="bar.attributes.sportsViewing" 
          class="attribute-chip attribute-chip-sports-viewing"
        >
          📺 Sports Viewing
        </span>
      </div>
      
      <!-- Open Status -->
      <div class="mt-3 text-sm">
        <span 
          :class="bar.isOpenNow ? 'text-green-600' : 'text-red-600'"
        >
          {{ bar.isOpenNow ? 'Open Now' : 'Closed' }}
        </span>
      </div>
      
      <!-- Details Button -->
      <button 
        @click="toggleDetails" 
        class="mt-3 text-primary hover:text-primary-dark text-sm flex items-center"
      >
        {{ showDetails ? 'Less Details' : 'More Details' }}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4 ml-1" 
          :class="{ 'transform rotate-180': showDetails }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <!-- Expanded Details -->
      <div v-if="showDetails" class="mt-3 pt-3 border-t border-gray-200">
        <!-- Price Level -->
        <div class="flex items-center text-sm text-gray-600 mb-2">
          <span class="font-semibold mr-2">Price:</span>
          <span>{{ '$'.repeat(bar.priceLevel) }}</span>
        </div>
        
        <!-- Phone & Website -->
        <div v-if="bar.phone" class="text-sm text-gray-600 mb-2">
          <span class="font-semibold mr-2">Phone:</span>
          <a :href="`tel:${bar.phone}`" class="text-primary">{{ bar.phone }}</a>
        </div>
        
        <div v-if="bar.website" class="text-sm text-gray-600 mb-2">
          <span class="font-semibold mr-2">Website:</span>
          <a :href="bar.website" target="_blank" rel="noopener noreferrer" class="text-primary">Visit Website</a>
        </div>
        
        <!-- Hours -->
        <div class="text-sm text-gray-600">
          <span class="font-semibold">Hours:</span>
          <div class="mt-1">
            <!-- This would be populated with actual hours data -->
            <div>Mon-Fri: 11:00 AM - 2:00 AM</div>
            <div>Sat-Sun: 10:00 AM - 2:00 AM</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBarStore } from '../../stores/barStore';

const props = defineProps({
  bar: {
    type: Object,
    required: true
  }
});

const barStore = useBarStore();
const showDetails = ref(false);

const isSelected = computed(() => {
  return barStore.selectedBar && barStore.selectedBar.id === props.bar.id;
});

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

// When the card is clicked, select this bar in the store
const selectBar = () => {
  barStore.setSelectedBar(props.bar.id);
};
</script> 