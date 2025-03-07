import { defineStore } from 'pinia';

export const useBarStore = defineStore('bars', {
  state: () => ({
    bars: [],
    loading: false,
    error: null,
    filters: {
      liveMusic: false,
      dogFriendly: false,
      poolTables: false,
      happyHour: false,
      outdoorSeating: false,
      sportsViewing: false,
      openNow: false,
      priceLevel: null,
      minRating: null,
      maxDistance: null
    },
    selectedBar: null,
    userLocation: null,
    defaultLocation: {
      lat: 45.5152,
      lng: -122.6784,
      name: 'Portland, OR'
    }
  }),
  
  getters: {
    filteredBars: (state) => {
      if (!state.bars.length) return [];
      
      return state.bars.filter(bar => {
        // Filter by attributes
        if (state.filters.liveMusic && !bar.attributes.liveMusic) return false;
        if (state.filters.dogFriendly && !bar.attributes.dogFriendly) return false;
        if (state.filters.poolTables && !bar.attributes.poolTables) return false;
        if (state.filters.happyHour && !bar.attributes.happyHour) return false;
        if (state.filters.outdoorSeating && !bar.attributes.outdoorSeating) return false;
        if (state.filters.sportsViewing && !bar.attributes.sportsViewing) return false;
        
        // Filter by open now
        if (state.filters.openNow && !bar.isOpenNow) return false;
        
        // Filter by price level
        if (state.filters.priceLevel !== null && bar.priceLevel > state.filters.priceLevel) return false;
        
        // Filter by rating
        if (state.filters.minRating !== null && bar.rating < state.filters.minRating) return false;
        
        // Filter by distance
        if (state.filters.maxDistance !== null && bar.distance > state.filters.maxDistance) return false;
        
        return true;
      });
    },
    
    currentLocation: (state) => {
      return state.userLocation || state.defaultLocation;
    }
  },
  
  actions: {
    async fetchBars() {
      this.loading = true;
      this.error = null;
      
      try {
        // In a real app, this would be an API call to Supabase
        // For now, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.bars = [
          // Mock data will be replaced with real API data
          {
            id: '1',
            name: 'The Friendly Pub',
            address: '123 Main St, Portland, OR',
            latitude: 45.5232,
            longitude: -122.6819,
            rating: 4.5,
            priceLevel: 2,
            photoUrl: 'https://placehold.co/600x400',
            isOpenNow: true,
            distance: 0.5,
            attributes: {
              liveMusic: true,
              dogFriendly: true,
              poolTables: false,
              happyHour: true,
              outdoorSeating: true,
              sportsViewing: false
            }
          },
          {
            id: '2',
            name: 'Sports Bar & Grill',
            address: '456 Oak St, Portland, OR',
            latitude: 45.5187,
            longitude: -122.6762,
            rating: 4.2,
            priceLevel: 2,
            photoUrl: 'https://placehold.co/600x400',
            isOpenNow: true,
            distance: 0.8,
            attributes: {
              liveMusic: false,
              dogFriendly: false,
              poolTables: true,
              happyHour: true,
              outdoorSeating: false,
              sportsViewing: true
            }
          },
          {
            id: '3',
            name: 'Craft Beer Haven',
            address: '789 Pine St, Portland, OR',
            latitude: 45.5211,
            longitude: -122.6747,
            rating: 4.8,
            priceLevel: 3,
            photoUrl: 'https://placehold.co/600x400',
            isOpenNow: false,
            distance: 1.2,
            attributes: {
              liveMusic: true,
              dogFriendly: true,
              poolTables: false,
              happyHour: false,
              outdoorSeating: true,
              sportsViewing: false
            }
          }
        ];
      } catch (error) {
        this.error = error.message || 'Failed to fetch bars';
        console.error('Error fetching bars:', error);
      } finally {
        this.loading = false;
      }
    },
    
    setSelectedBar(barId) {
      this.selectedBar = this.bars.find(bar => bar.id === barId) || null;
    },
    
    setUserLocation(location) {
      this.userLocation = location;
    },
    
    resetFilters() {
      this.filters = {
        liveMusic: false,
        dogFriendly: false,
        poolTables: false,
        happyHour: false,
        outdoorSeating: false,
        sportsViewing: false,
        openNow: false,
        priceLevel: null,
        minRating: null,
        maxDistance: null
      };
    },
    
    toggleFilter(filterName) {
      if (typeof this.filters[filterName] === 'boolean') {
        this.filters[filterName] = !this.filters[filterName];
      }
    },
    
    setFilter(filterName, value) {
      this.filters[filterName] = value;
    }
  }
}); 