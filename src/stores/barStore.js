import { defineStore } from 'pinia';
import { supabase } from '../utils/supabase';
import { sampleBars } from '../data/sampleBars';

// Check if we should use sample data from the environment variable
const useSampleData = import.meta.env.VITE_USE_SAMPLE_DATA === 'true';

export const useBarStore = defineStore('bars', {
  state: () => ({
    bars: [],
    loading: false,
    error: null,
    dataSource: useSampleData ? 'sample' : 'supabase',
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
        if (useSampleData) {
          // Use sample data with a simulated delay
          console.log('Using sample data for bars');
          await new Promise(resolve => setTimeout(resolve, 500));
          this.bars = sampleBars;
        } else {
          // Fetch data from Supabase
          console.log('Fetching bars from Supabase');
          const { data, error } = await supabase
            .from('bars')
            .select('*');
            
          if (error) throw error;
          
          // Transform data if needed to match the expected format
          this.bars = data.map(bar => ({
            id: bar.id,
            name: bar.name,
            address: bar.address,
            latitude: bar.location?.lat || 0,
            longitude: bar.location?.lng || 0,
            rating: bar.rating || 0,
            priceLevel: bar.price_level || 1,
            photoUrl: bar.image_url || 'https://placehold.co/600x400',
            isOpenNow: this.checkIfOpen(bar.hours),
            distance: this.calculateDistance(bar.location?.lat, bar.location?.lng),
            phone: bar.phone || '',
            website: bar.website || '',
            attributes: {
              liveMusic: bar.live_music || false,
              dogFriendly: bar.allows_dogs || false,
              poolTables: false, // Not in the schema, default to false
              happyHour: false, // Not in the schema, default to false
              outdoorSeating: bar.outdoor_seating || false,
              sportsViewing: bar.good_for_sports || false
            }
          }));
        }
      } catch (error) {
        this.error = error.message || 'Failed to fetch bars';
        console.error('Error fetching bars:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Helper method to check if a bar is currently open
    checkIfOpen(hours) {
      if (!hours) return false;
      
      try {
        // Get current day and time
        const now = new Date();
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currentDay = days[now.getDay()];
        
        // Check if the bar has hours for the current day
        if (!hours[currentDay]) return false;
        
        // Check if the bar is closed today
        if (hours[currentDay].closed) return false;
        
        // Parse opening and closing times
        const openTime = hours[currentDay].open;
        const closeTime = hours[currentDay].close;
        
        if (!openTime || !closeTime) return false;
        
        // Convert current time to hours and minutes
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTimeStr = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
        
        // Check if current time is between open and close times
        return currentTimeStr >= openTime && currentTimeStr <= closeTime;
      } catch (error) {
        console.error('Error checking if bar is open:', error);
        return false;
      }
    },
    
    // Helper method to calculate distance from user location
    calculateDistance(lat, lng) {
      // This is a simplified implementation
      // In a real app, you would calculate the actual distance from user's location
      const userLat = this.currentLocation.lat;
      const userLng = this.currentLocation.lng;
      
      // Simple distance calculation (not accurate for real-world use)
      const distance = Math.sqrt(
        Math.pow(lat - userLat, 2) + Math.pow(lng - userLng, 2)
      ) * 100;
      
      return parseFloat(distance.toFixed(1));
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
    },
    
    // Toggle between sample data and Supabase
    toggleDataSource() {
      // This is for debugging/development only
      this.dataSource = this.dataSource === 'sample' ? 'supabase' : 'sample';
      this.fetchBars();
    }
  }
}); 