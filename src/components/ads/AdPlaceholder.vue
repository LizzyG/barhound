<!-- 
  AdPlaceholder.vue
  This component serves as a placeholder for future ad integration.
  It will be replaced with actual ad components when monetization is implemented.
-->
<template>
  <div 
    class="ad-placeholder" 
    :class="[
      sizeClasses, 
      { 'hidden': !shouldShowPlaceholder }
    ]"
  >
    <div v-if="shouldShowPlaceholder" class="ad-placeholder-content">
      <div class="ad-label">ADVERTISEMENT</div>
      <div class="ad-size">{{ size }}</div>
      <div class="ad-id" v-if="id">ID: {{ id }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'banner', // banner, sidebar, card, leaderboard
    validator: (value) => ['banner', 'sidebar', 'card', 'leaderboard', 'square'].includes(value)
  },
  id: {
    type: String,
    default: ''
  },
  showInDevelopment: {
    type: Boolean,
    default: true
  }
});

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Check if we should show ad placeholders from environment variable
const showAdPlaceholders = import.meta.env.VITE_SHOW_AD_PLACEHOLDERS === 'true';

// Determine if we should show this placeholder
const shouldShowPlaceholder = computed(() => {
  if (!isDevelopment) return false; // Never show in production
  if (!showAdPlaceholders) return false; // Respect global setting
  return props.showInDevelopment; // Respect component prop
});

// Compute classes based on size
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'banner':
      return 'ad-placeholder-banner';
    case 'sidebar':
      return 'ad-placeholder-sidebar';
    case 'card':
      return 'ad-placeholder-card';
    case 'leaderboard':
      return 'ad-placeholder-leaderboard';
    case 'square':
      return 'ad-placeholder-square';
    default:
      return 'ad-placeholder-banner';
  }
});
</script>

<style scoped>
.ad-placeholder {
  background-color: rgba(229, 231, 235, 0.5);
  border: 1px dashed #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  border-radius: 0.375rem;
  overflow: hidden;
}

.ad-placeholder-content {
  text-align: center;
  color: #94a3b8;
  font-size: 0.75rem;
  padding: 0.5rem;
}

.ad-label {
  font-weight: 500;
  letter-spacing: 0.05em;
}

.ad-size {
  margin-top: 0.25rem;
  font-size: 0.7rem;
}

.ad-id {
  margin-top: 0.25rem;
  font-size: 0.7rem;
  opacity: 0.7;
}

/* Size variants */
.ad-placeholder-banner {
  height: 60px;
  width: 100%;
}

.ad-placeholder-sidebar {
  height: 250px;
  width: 300px;
  max-width: 100%;
}

.ad-placeholder-card {
  height: 120px;
  width: 100%;
}

.ad-placeholder-leaderboard {
  height: 90px;
  width: 728px;
  max-width: 100%;
}

.ad-placeholder-square {
  height: 250px;
  width: 250px;
  max-width: 100%;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .ad-placeholder {
    margin: 0.5rem 0;
  }
  
  .ad-placeholder-sidebar,
  .ad-placeholder-leaderboard {
    width: 100%;
    height: 100px;
  }
  
  .ad-placeholder-banner {
    height: 50px;
  }
  
  .ad-placeholder-square {
    height: 200px;
    width: 200px;
  }
  
  .ad-placeholder-card {
    height: 80px;
  }
}
</style> 