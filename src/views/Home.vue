<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
      <!-- Filters Sidebar (Desktop) -->
      <div class="hidden md:block w-80 p-4 overflow-y-auto bg-gray-50">
        <FilterPanel />
      </div>
      
      <!-- Map and Bar List -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Mobile Filter Toggle -->
        <div class="md:hidden p-4 bg-white border-b">
          <button 
            @click="showMobileFilters = !showMobileFilters" 
            class="w-full py-2 px-4 bg-primary text-white rounded-md flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {{ showMobileFilters ? 'Hide Filters' : 'Show Filters' }}
          </button>
        </div>
        
        <!-- Mobile Filters Panel -->
        <div v-if="showMobileFilters" class="md:hidden p-4 bg-gray-50 border-b">
          <FilterPanel />
        </div>
        
        <!-- Map View -->
        <div class="h-1/2 md:h-1/2 relative">
          <MapView />
        </div>
        
        <!-- Bar List -->
        <div class="h-1/2 md:h-1/2 overflow-y-auto p-4 bg-gray-100">
          <div v-if="loading" class="flex justify-center items-center h-full">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          
          <div v-else-if="error" class="flex justify-center items-center h-full">
            <div class="text-red-500">{{ error }}</div>
          </div>
          
          <div v-else-if="filteredBars.length === 0" class="flex justify-center items-center h-full">
            <div class="text-gray-500 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-lg font-semibold">No bars match your filters</p>
              <p class="mt-2">Try adjusting your filters to see more results.</p>
              <button 
                @click="resetFilters" 
                class="mt-4 px-4 py-2 bg-primary text-white rounded-md"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div 
              v-for="bar in filteredBars" 
              :key="bar.id"
              @click="selectBar(bar.id)"
            >
              <BarCard :bar="bar" />
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
import { ref, computed, onMounted } from 'vue';
import { useBarStore } from '../stores/barStore';
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import FilterPanel from '../components/filters/FilterPanel.vue';
import MapView from '../components/map/MapView.vue';
import BarCard from '../components/bars/BarCard.vue';

const barStore = useBarStore();
const showMobileFilters = ref(false);

// Computed properties
const loading = computed(() => barStore.loading);
const error = computed(() => barStore.error);
const filteredBars = computed(() => barStore.filteredBars);

// Methods
const resetFilters = () => {
  barStore.resetFilters();
};

const selectBar = (barId) => {
  barStore.setSelectedBar(barId);
};

// Fetch bars on component mount
onMounted(() => {
  if (barStore.bars.length === 0) {
    barStore.fetchBars();
  }
});
</script> 