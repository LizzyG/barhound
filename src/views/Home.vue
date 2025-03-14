<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Filters and Content Container -->
      <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <!-- Filters Sidebar -->
        <div class="hidden md:block w-64 p-3 overflow-y-auto bg-gray-50 border-r">
          <FilterPanel />
          
          <!-- Sidebar Ad Placeholder -->
          <AdPlaceholder 
            size="sidebar" 
            id="sidebar-1"
            class="mt-4"
          />
        </div>
        
        <!-- Mobile Filter Toggle -->
        <div class="md:hidden p-2 bg-white border-b">
          <button 
            @click="showMobileFilters = !showMobileFilters" 
            class="w-full py-1.5 px-3 bg-primary text-white rounded-md flex items-center justify-center text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {{ showMobileFilters ? 'Hide Filters' : 'Show Filters' }}
          </button>
        </div>
        
        <!-- Mobile Filters Panel -->
        <div v-if="showMobileFilters" class="md:hidden p-3 bg-gray-50 border-b overflow-y-auto max-h-[50vh]">
          <FilterPanel />
          
          <!-- Mobile Filters Ad -->
          <div class="mt-3">
            <AdPlaceholder 
              size="banner" 
              id="mobile-filters-ad"
            />
          </div>
        </div>
        
        <!-- Map and Bar List Container -->
        <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <!-- Map View (40% width on large screens, full height) -->
          <div class="h-[40vh] lg:h-auto lg:w-2/5 relative">
            <MapView />
          </div>
          
          <!-- Bar List (60% width on large screens) -->
          <div class="flex-1 overflow-y-auto p-3 bg-gray-100" @scroll="onScroll" ref="barListContainer">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center h-full">
              <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
            
            <!-- Error State -->
            <div v-else-if="error" class="flex justify-center items-center h-full">
              <div class="text-red-500">{{ error }}</div>
            </div>
            
            <!-- Empty State -->
            <div v-else-if="filteredBars.length === 0" class="flex justify-center items-center h-full">
              <div class="text-gray-500 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-lg font-semibold">No bars match your filters</p>
                <p class="mt-1 text-sm">Try adjusting your filters to see more results.</p>
                <button 
                  @click="resetFilters" 
                  class="mt-3 px-3 py-1.5 bg-primary text-white rounded-md text-sm"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            <!-- Scroll Indicator (only visible when content overflows) -->
            <div v-if="filteredBars.length > 0 && shouldShowScrollIndicator" class="flex justify-center mb-2 text-xs text-gray-500 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span class="ml-1">Scroll down for more</span>
            </div>
            
            <!-- Top Banner Ad (visible on all devices) -->
            <div v-if="filteredBars.length > 0" class="mb-3">
              <AdPlaceholder 
                size="banner" 
                id="top-banner"
              />
            </div>
            
            <!-- Bar List Grid -->
            <div v-if="filteredBars.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <template v-for="(bar, index) in filteredBars" :key="bar.id">
                <!-- Bar Card -->
                <div 
                  @click="selectBar(bar.id)"
                  class="max-w-md mx-auto w-full"
                >
                  <BarCard :bar="bar" />
                </div>
                
                <!-- Inline Ad after every 4th card on mobile, 6th card on desktop -->
                <div 
                  v-if="(isMobile && (index + 1) % 4 === 0 && index < filteredBars.length - 1) || 
                       (!isMobile && (index + 1) % 6 === 0 && index < filteredBars.length - 1)" 
                  class="max-w-md mx-auto w-full md:col-span-2 xl:col-span-3"
                >
                  <AdPlaceholder 
                    size="banner" 
                    :id="`inline-${Math.floor(isMobile ? index / 4 : index / 6)}`"
                  />
                </div>
              </template>
            </div>
            
            <!-- Bottom Banner Ad -->
            <div v-if="filteredBars.length > 0" class="mt-4">
              <AdPlaceholder 
                size="banner" 
                id="bottom-banner"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from 'vue';
import { useBarStore } from '../stores/barStore';
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import FilterPanel from '../components/filters/FilterPanel.vue';
import MapView from '../components/map/MapView.vue';
import BarCard from '../components/bars/BarCard.vue';
import AdPlaceholder from '../components/ads/AdPlaceholder.vue';

const barStore = useBarStore();
const showMobileFilters = ref(false);
const hasScrolled = ref(false);
const barListContainer = ref(null);
const contentOverflows = ref(false);
const isMobile = ref(false);

// Check if device is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Computed properties
const loading = computed(() => barStore.loading);
const error = computed(() => barStore.error);
const filteredBars = computed(() => barStore.filteredBars);
const shouldShowScrollIndicator = computed(() => {
  // On mobile, show if content overflows and user hasn't scrolled
  // On desktop, only show if content overflows and user hasn't scrolled
  return contentOverflows.value && !hasScrolled.value;
});

// Methods
const resetFilters = () => {
  barStore.resetFilters();
};

const selectBar = (barId) => {
  barStore.setSelectedBar(barId);
};

const onScroll = () => {
  if (barListContainer.value && barListContainer.value.scrollTop > 20) {
    hasScrolled.value = true;
  }
};

const checkContentOverflow = () => {
  if (barListContainer.value) {
    // Check if content height is greater than container height
    contentOverflows.value = barListContainer.value.scrollHeight > barListContainer.value.clientHeight;
  }
};

// Fetch bars on component mount
onMounted(() => {
  // Check if device is mobile
  checkMobile();
  
  if (barStore.bars.length === 0) {
    barStore.fetchBars();
  }
  
  // Check for content overflow after bars are loaded and DOM is updated
  nextTick(() => {
    checkContentOverflow();
    
    // Add resize listeners
    window.addEventListener('resize', checkContentOverflow);
    window.addEventListener('resize', checkMobile);
  });
});

// Clean up event listeners when component is unmounted
onUnmounted(() => {
  window.removeEventListener('resize', checkContentOverflow);
  window.removeEventListener('resize', checkMobile);
});

// Watch for changes in filtered bars to recheck overflow
watch(filteredBars, () => {
  nextTick(checkContentOverflow);
});
</script> 