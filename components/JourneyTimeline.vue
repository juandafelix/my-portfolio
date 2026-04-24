<template>
  <div class="space-y-6 md:space-y-8">
    <div v-for="(project, index) in projects" :key="project.id || index" class="w-full bg-white p-5 md:p-8 rounded-2xl subtle-shadow border border-minimal-border hover:shadow-lg transition-shadow duration-300">
      <div class="text-[10px] md:text-xs text-minimal-accent font-bold mb-3 uppercase tracking-widest">{{ project.category }}</div>
      <h3 class="text-xl md:text-2xl font-bold text-minimal-text mb-3 tracking-tight">{{ project.title }}</h3>
      <p class="text-minimal-text-light text-sm md:text-base leading-relaxed mb-6 max-w-2xl">{{ project.description }}</p>
      
      <!-- Actions -->
      <div class="flex gap-4">
          <button v-if="project.media_type === 'pdf'" @click="$emit('open-media', project)" class="inline-flex items-center gap-2 px-5 py-2.5 bg-minimal-bg border border-minimal-border text-minimal-text hover:border-minimal-accent hover:text-minimal-accent transition-colors rounded-lg cursor-pointer font-medium text-sm">
            📄 View Document
          </button>
          <a v-else-if="project.media_type === 'external_link'" :href="project.media_url" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 bg-minimal-accent text-white hover:bg-blue-700 transition-colors rounded-lg cursor-pointer font-medium text-sm">
            🔗 Launch Website
          </a>
          <button v-else-if="project.media_type === 'image'" @click="$emit('open-media', project)" class="inline-flex items-center gap-2 px-5 py-2.5 bg-minimal-bg border border-minimal-border text-minimal-text hover:border-minimal-accent hover:text-minimal-accent transition-colors rounded-lg cursor-pointer font-medium text-sm">
            🖼️ View Image
          </button>
      </div>
    </div>
    
    <div v-if="projects.length === 0" class="text-center text-minimal-text-light py-10 border border-dashed border-minimal-border rounded-2xl">
      No projects available.
    </div>
  </div>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>
