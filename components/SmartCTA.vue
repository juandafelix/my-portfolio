<template>
  <div>
    <!-- Floating Button -->
    <button 
      @click="isOpen = true"
      class="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-minimal-accent text-white subtle-shadow hover:scale-105 transition-transform cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>

    <!-- Modal -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-minimal-text-light/20 backdrop-blur-sm px-4" @click.self="isOpen = false">
      <div class="bg-white p-6 md:p-8 max-w-sm w-full relative border border-minimal-border rounded-2xl subtle-shadow animate-[fadeIn_0.2s_ease-out]">
        <button @click="isOpen = false" class="absolute top-4 right-4 text-minimal-text-light hover:text-minimal-text text-xl cursor-pointer transition-colors">&times;</button>
        <h3 class="text-xl font-bold text-minimal-text mb-6 text-center">Let's Connect</h3>
        
        <div class="space-y-3 flex flex-col">
          <!-- WhatsApp -->
          <a href="https://wa.me/6281265955472?text=Halo%20Juanda,%20saya%20melihat%20portfolio%20Anda%20dan%20ingin%20berdiskusi." target="_blank" class="group flex items-center justify-between py-3 px-5 border border-minimal-border rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300">
            <div class="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span class="text-minimal-text font-semibold">WhatsApp</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-minimal-text-light opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <!-- Email -->
          <a href="mailto:juandasinurat13@gmail.com?subject=Portfolio%20Inquiry" target="_blank" class="group flex items-center justify-between py-3 px-5 border border-minimal-border rounded-xl hover:border-minimal-accent hover:bg-blue-50 transition-all duration-300">
            <div class="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-minimal-accent"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              <span class="text-minimal-text font-semibold">Email Me</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-minimal-text-light opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/in/juandafelixsinurat" target="_blank" class="group flex items-center justify-between py-3 px-5 border border-minimal-border rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-300">
            <div class="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span class="text-minimal-text font-semibold">LinkedIn</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-minimal-text-light opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <!-- Instagram -->
          <a href="https://www.instagram.com/inijuan._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" class="group flex items-center justify-between py-3 px-5 border border-minimal-border rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all duration-300">
            <div class="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-pink-500"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span class="text-minimal-text font-semibold">Instagram</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-minimal-text-light opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <!-- GitHub -->
          <a href="https://github.com/juandafelix" target="_blank" class="group flex items-center justify-between py-3 px-5 border border-minimal-border rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-300">
            <div class="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span class="text-minimal-text font-semibold">GitHub</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-minimal-text-light opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>
