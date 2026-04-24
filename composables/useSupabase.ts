export const useProjects = () => {
    const supabase = useSupabaseClient()
    
    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })
            
        if (error) {
            console.error('Error fetching projects:', error.message)
            return null
        }
        return data || []
    }
    
    const uploadMedia = async (file: File, path: string) => {
        const { data, error } = await supabase.storage
            .from('project_media')
            .upload(path, file, { upsert: true })

        if (error) {
            console.error('Error uploading file:', error.message)
            throw error
        }

        const { data: { publicUrl } } = supabase.storage
            .from('project_media')
            .getPublicUrl(path)
            
        return publicUrl
    }

    const addProject = async (projectData: any) => {
        const { data, error } = await supabase
            .from('projects')
            .insert(projectData)
            .select()
            .single()

        if (error) {
            console.error('Error adding project:', error.message)
            throw error
        }
        return data
    }
    
    const deleteProject = async (id: string) => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting project:', error.message)
            throw error
        }
    }

    const fetchSkills = async () => {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('name', { ascending: true })

        if (error) {
            console.error('Error fetching skills:', error.message)
            return []
        }
        return data || []
    }

    const addSkill = async (skillData: any) => {
        const { data, error } = await supabase
            .from('skills')
            .insert(skillData)
            .select()
            .single()

        if (error) {
            console.error('Error adding skill:', error.message)
            throw error
        }
        return data
    }

    const deleteSkill = async (id: string) => {
        const { error } = await supabase
            .from('skills')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting skill:', error.message)
            throw error
        }
    }
    
    const fetchProfile = async () => {
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .single()
        return data || { avatar_url: null }
    }

    const updateProfile = async (avatarUrl: string) => {
        const { error } = await supabase
            .from('profile')
            .upsert({ id: 1, avatar_url: avatarUrl })
        if (error) throw error
    }

    const fetchCertificates = async () => {
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .order('created_at', { ascending: false })
        return data || []
    }

    const addCertificate = async (certData: any) => {
        const { data, error } = await supabase
            .from('certificates')
            .insert(certData)
            .select()
        if (error) throw error
        return data
    }

    const deleteCertificate = async (id: string) => {
        const { error } = await supabase
            .from('certificates')
            .delete()
            .eq('id', id)
        if (error) throw error
    }
    
    return {
        fetchProjects,
        uploadMedia,
        addProject,
        deleteProject,
        fetchSkills,
        addSkill,
        deleteSkill,
        fetchProfile,
        updateProfile,
        fetchCertificates,
        addCertificate,
        deleteCertificate
    }
}
