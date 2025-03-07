<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-primary">404</h1>
        <h2 class="text-3xl font-bold text-gray-800 mt-4 mb-6">Page Not Found</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <router-link 
          to="/" 
          class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition-colors"
        >
          Back to Home
        </router-link>
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