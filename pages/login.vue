<template>
  <div class="min-h-[80vh] flex items-center justify-center container mx-auto px-4 outline-none pt-20">
    <div class="bg-white p-8 max-w-md w-full border border-minimal-border rounded-2xl subtle-shadow hover:shadow-lg transition-shadow duration-300">
      <h2 class="text-3xl font-bold font-sans text-center text-minimal-text mb-8 tracking-tight">System Auth</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-minimal-text-light font-medium text-sm mb-2">Email Address</label>
          <input v-model="email" type="email" required class="w-full bg-minimal-bg border border-minimal-border px-4 py-3 text-minimal-text rounded-lg outline-none focus:border-minimal-accent focus:ring-1 focus:ring-minimal-accent transition-all" />
        </div>
        <div>
          <label class="block text-minimal-text-light font-medium text-sm mb-2">Access Key</label>
          <input v-model="password" type="password" required class="w-full bg-minimal-bg border border-minimal-border px-4 py-3 text-minimal-text rounded-lg outline-none focus:border-minimal-accent focus:ring-1 focus:ring-minimal-accent transition-all" />
        </div>
        <button type="submit" :disabled="loading" class="w-full py-3 bg-minimal-accent text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2 cursor-pointer shadow-sm">
          {{ loading ? 'Authenticating...' : 'Sign In' }}
        </button>
        <div v-if="errorMsg" class="text-red-500 bg-red-50 p-3 rounded-lg text-center text-sm mt-4 font-medium border border-red-100">
          {{ errorMsg }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// Watch for user session and redirect immediately
watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/admin/dashboard')
  }
})

// Redirect if already logged in via middleware
definePageMeta({
  middleware: [
    function (to, from) {
      const user = useSupabaseUser()
      if (user.value) {
        return navigateTo('/admin/dashboard')
      }
    }
  ]
})

const handleLogin = async () => {
  if (loading.value) return
  
  loading.value = true
  errorMsg.value = ''
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    
    // The watch(user) will handle the redirection automatically
  } catch (error) {
    errorMsg.value = error.message
    loading.value = false
  }
}
</script>
