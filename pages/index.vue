<template>
  <div class="container mx-auto px-4 py-10 md:py-20 min-h-screen max-w-6xl">
    <header class="mb-16 md:mb-24 pt-8 md:pt-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 md:gap-12">
      <div class="max-w-2xl text-center lg:text-left">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight text-minimal-text leading-tight">
          From complexity to <br class="hidden md:block"> <span class="text-minimal-accent">scalable impact.</span>
        </h1>
        <p class="text-lg md:text-xl text-minimal-text-light font-medium">Multidisciplinary Tech Specialist | Turning Complex Ideas into Scalable Solutions</p>
      </div>
      <div v-if="profileAvatar" class="w-40 h-40 md:w-64 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-2xl rotate-2 md:rotate-3 hover:rotate-0 transition-all duration-500">
          <img :src="profileAvatar" class="w-full h-full object-cover" alt="Profile Photo" />
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
      <div class="md:col-span-8 w-full max-w-full overflow-hidden">
        <h3 class="text-xs font-bold uppercase tracking-widest text-minimal-text-light mb-8">Selected Case Studies</h3>
        <JourneyTimeline :projects="projects" @open-media="openModal($event, 'project')" />
      </div>
      <div class="md:col-span-4 sticky top-10">
        <h3 class="text-xs font-bold uppercase tracking-widest text-minimal-text-light mb-8">Tech Stack</h3>
        <SkillDashboard />
      </div>
    </div>
    
    <!-- Certificates Section -->
    <div class="mt-32 mb-20">
      <h3 class="text-xs font-bold uppercase tracking-widest text-minimal-text-light mb-8">Professional Certifications</h3>
      <div v-if="certificates.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="cert in certificates" :key="cert.id" @click="openModal(cert, 'cert')" class="group bg-white p-4 rounded-xl border border-minimal-border subtle-shadow hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div class="aspect-video md:aspect-square rounded-lg overflow-hidden mb-4 bg-gray-50 border border-minimal-border flex items-center justify-center relative">
            <template v-if="cert.image_url?.toLowerCase().endsWith('.pdf')">
              <div class="w-full h-full flex flex-col items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors group/pdf">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                 <span class="text-[10px] font-bold uppercase mt-2 tracking-widest">Preview PDF</span>
              </div>
            </template>
            <img v-else :src="cert.image_url" class="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" :alt="cert.name" />
          </div>
          <h4 class="text-sm font-bold text-minimal-text text-center line-clamp-2 h-10 flex items-center justify-center px-2">{{ cert.name }}</h4>
        </div>
      </div>
      <div v-else class="text-minimal-text-light italic text-sm py-8 text-center border border-dashed border-minimal-border rounded-xl">
        Loading certifications or none added yet.
      </div>
    </div>
    
    <SmartCTA />

    <!-- Lightbox Modal -->
    <Transition name="fade">
      <div v-if="selectedMedia" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" @click="selectedMedia = null">
        <div class="relative w-full max-w-5xl h-full flex flex-col items-center justify-center" @click.stop>
          <button @click="selectedMedia = null" class="absolute top-2 right-2 md:-top-12 md:-right-12 p-3 bg-white/10 md:bg-transparent rounded-full text-white hover:text-minimal-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" md:width="32" md:height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          
          <div class="w-full h-[70vh] md:h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center">
            <template v-if="selectedMedia.url?.toLowerCase().endsWith('.pdf')">
              <!-- Iframe for Desktop Preview -->
              <iframe :src="selectedMedia.url" class="hidden md:block w-full h-full border-none"></iframe>
              
              <!-- Mobile Fallback / Direct Link -->
              <div class="md:hidden flex flex-col items-center justify-center p-8 text-center">
                <div class="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                </div>
                <h4 class="text-minimal-text font-bold text-lg mb-2">Pratinjau PDF Terbatas di HP</h4>
                <p class="text-minimal-text-light text-sm mb-8">Silakan klik tombol di bawah untuk membuka dokumen dengan aman di tab baru.</p>
                <a :href="selectedMedia.url" target="_blank" class="px-8 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 transition-colors inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Buka Dokumen
                </a>
              </div>
            </template>
            <img v-else :src="selectedMedia.url" class="max-w-full max-h-full object-contain" />
          </div>
          
          <div class="mt-4 md:mt-6 text-center text-white px-4">
            <h3 class="text-lg md:text-xl font-bold">{{ selectedMedia.name }}</h3>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { onMounted, ref } from 'vue'

const { fetchProjects, fetchProfile, fetchCertificates } = useProjects()

const projects = ref([])
const certificates = ref([])
const profileAvatar = ref(null)
const selectedMedia = ref(null)

const openModal = (item, type = 'cert') => {
  if (type === 'project') {
    selectedMedia.value = {
      name: item.title,
      url: item.media_url
    }
  } else {
    selectedMedia.value = {
      name: item.name,
      url: item.image_url
    }
  }
}

onMounted(async () => {
  // Fetch everything in parallel
  try {
      const [projData, profData, certData] = await Promise.all([
          fetchProjects(),
          fetchProfile(),
          fetchCertificates()
      ])
      
      if (projData) {
        projects.value = projData
      }
      
      if (profData) profileAvatar.value = profData.avatar_url
      if (certData) certificates.value = certData
      
  } catch(e) {
      console.error('Error fetching data:', e)
  }
})

</script>
