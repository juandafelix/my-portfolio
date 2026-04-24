export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()
    
    // Updated to your new email
    const adminEmail = 'portfolio@gmail.com' 

    if (!user.value) {
        return navigateTo('/login')
    }

    if (user.value.email !== adminEmail) {
        console.warn('Unauthorized access attempt by:', user.value.email)
        return navigateTo('/')
    }
})
