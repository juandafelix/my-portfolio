export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()
    
    // Reverted to your original email
    const adminEmail = 'admin@example.com' 

    if (!user.value) {
        return navigateTo('/login')
    }

    if (user.value.email !== adminEmail) {
        console.warn('Unauthorized access attempt by:', user.value.email)
        return navigateTo('/')
    }
})
