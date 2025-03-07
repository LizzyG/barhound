<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">About BarHound</h1>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p class="text-gray-600 mb-4">
            BarHound helps you find the perfect bar that matches your preferences in Portland, Oregon. 
            Whether you're looking for a place with live music, a dog-friendly patio, or somewhere to 
            watch the game, BarHound makes it easy to discover new spots that meet your criteria.
          </p>
          <p class="text-gray-600">
            We believe that finding the right bar shouldn't be a hassle. That's why we've created a 
            simple, intuitive platform that lets you filter bars by the features that matter most to you.
          </p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Set Your Filters</h3>
              <p class="text-gray-600">
                Choose from our six core attributes: live music, dog-friendly, pool tables, happy hour, outdoor seating, and sports viewing.
              </p>
            </div>
            
            <div class="text-center">
              <div class="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Explore the Map</h3>
              <p class="text-gray-600">
                See all matching bars on our interactive map, centered on your location or Portland, OR.
              </p>
            </div>
            
            <div class="text-center">
              <div class="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Find Your Perfect Bar</h3>
              <p class="text-gray-600">
                Browse detailed information about each bar, including photos, ratings, and hours.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Our Data</h2>
          <p class="text-gray-600 mb-4">
            BarHound uses data from Google Places API, enhanced with our own analysis of reviews to 
            identify key attributes that might not be explicitly listed. We update our data regularly 
            to ensure you have the most accurate information.
          </p>
          <p class="text-gray-600">
            Currently, BarHound focuses on bars in the Portland, Oregon area, but we plan to expand 
            to more cities in the future.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
</script> 