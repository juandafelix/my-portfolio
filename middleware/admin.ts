export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()
    const config = useRuntimeConfig()
    
    // You can also use a hardcoded email here or set it in nuxt.config.ts / .env
    const adminEmail = 'admin@example.com' 

    if (!user.value) {
        return navigateTo('/login')
    }

    if (user.value.email !== adminEmail) {
        console.warn('Unauthorized access attempt by:', user.value.email)
        return navigateTo('/')
    }
})
