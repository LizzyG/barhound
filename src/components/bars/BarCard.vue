<template>
  <div 
    class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer transform hover:-translate-y-1"
    :class="{ 'ring-2 ring-primary': isSelected }"
  >
    <!-- Image -->
    <div class="relative h-32 bg-gray-200">
      <img 
        :src="bar.photoUrl" 
        :alt="bar.name" 
        class="w-full h-full object-cover"
      />
      <div class="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 text-xs font-bold flex items-center">
        <span class="text-yellow-500 mr-1">★</span>
        {{ bar.rating }}
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-1 left-2 text-white font-bold text-sm line-clamp-1">
        {{ bar.name }}
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-2 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-1">
        <p class="text-xs text-gray-600 line-clamp-1">{{ bar.address }}</p>
        <span class="text-xs text-gray-500 whitespace-nowrap ml-1">{{ bar.distance }} mi</span>
      </div>
      
      <!-- Attribute Chips -->
      <div class="mb-2 flex flex-wrap gap-1">
        <span 
          v-if="bar.attributes.liveMusic" 
          class="attribute-chip attribute-chip-live-music text-xs"
        >
          🎵
        </span>
        <span 
          v-if="bar.attributes.dogFriendly" 
          class="attribute-chip attribute-chip-dog-friendly text-xs"
        >
          🐕
        </span>
        <span 
          v-if="bar.attributes.poolTables" 
          class="attribute-chip attribute-chip-pool-tables text-xs"
        >
          🎱
        </span>
        <span 
          v-if="bar.attributes.happyHour" 
          class="attribute-chip attribute-chip-happy-hour text-xs"
        >
          🍹
        </span>
        <span 
          v-if="bar.attributes.outdoorSeating" 
          class="attribute-chip attribute-chip-outdoor-seating text-xs"
        >
          🌳
        </span>
        <span 
          v-if="bar.attributes.sportsViewing" 
          class="attribute-chip attribute-chip-sports-viewing text-xs"
        >
          📺
        </span>
      </div>
      
      <!-- Open Status and Details Button -->
      <div class="mt-auto flex justify-between items-center">
        <span 
          :class="bar.isOpenNow ? 'text-green-600' : 'text-red-600'"
          class="text-xs font-medium"
        >
          {{ bar.isOpenNow ? 'Open Now' : 'Closed' }}
        </span>
        
        <button 
          @click.stop="toggleDetails" 
          class="text-primary hover:text-primary-dark text-xs flex items-center"
        >
          {{ showDetails ? 'Less' : 'More' }}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-3 w-3 ml-1" 
            :class="{ 'transform rotate-180': showDetails }"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <!-- Expanded Details -->
      <div v-if="showDetails" class="mt-2 pt-2 border-t border-gray-200 text-xs">
        <!-- Price Level -->
        <div class="flex items-center text-gray-600 mb-1">
          <span class="font-semibold mr-2">Price:</span>
          <span>{{ '$'.repeat(bar.priceLevel) }}</span>
        </div>
        
        <!-- Phone & Website -->
        <div v-if="bar.phone" class="text-gray-600 mb-1">
          <span class="font-semibold mr-2">Phone:</span>
          <a :href="`tel:${bar.phone}`" class="text-primary" @click.stop>{{ bar.phone }}</a>
        </div>
        
        <div v-if="bar.website" class="text-gray-600 mb-1">
          <span class="font-semibold mr-2">Website:</span>
          <a :href="bar.website" target="_blank" rel="noopener noreferrer" class="text-primary" @click.stop>Visit Website</a>
        </div>
        
        <!-- Hours -->
        <div class="text-gray-600">
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

const toggleDetails = (event) => {
  event.stopPropagation();
  showDetails.value = !showDetails.value;
};

// When the card is clicked, select this bar in the store
const selectBar = () => {
  barStore.setSelectedBar(props.bar.id);
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 