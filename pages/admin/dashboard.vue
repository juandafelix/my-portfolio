<template>
  <div class="container mx-auto px-4 py-10 md:py-20 min-h-screen max-w-4xl">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-minimal-border">
      <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-minimal-text">Admin Dashboard</h1>
      <button @click="logout" class="text-minimal-text-light hover:text-red-500 font-medium text-sm transition-colors cursor-pointer">
        Sign Out
      </button>
    </div>

    <div class="bg-white p-5 md:p-8 rounded-2xl border border-minimal-border subtle-shadow">
      <h2 class="text-xl font-bold text-minimal-text mb-6">Add New Project</h2>
      
      <form @submit.prevent="submitProject" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-minimal-text-light text-sm font-medium mb-2">Project Title</label>
            <input v-model="form.title" type="text" required class="w-full bg-minimal-bg border border-minimal-border px-4 py-2.5 rounded-lg text-minimal-text outline-none focus:border-minimal-accent transition-colors" />
          </div>
          <div>
            <label class="block text-minimal-text-light text-sm font-medium mb-2">Category (e.g. Frontend, Data)</label>
            <input v-model="form.category" type="text" required class="w-full bg-minimal-bg border border-minimal-border px-4 py-2.5 rounded-lg text-minimal-text outline-none focus:border-minimal-accent transition-colors" />
          </div>
        </div>

        <div>
          <label class="block text-minimal-text-light text-sm font-medium mb-2">Description</label>
          <textarea v-model="form.description" required rows="4" class="w-full bg-minimal-bg border border-minimal-border px-4 py-2.5 rounded-lg text-minimal-text outline-none focus:border-minimal-accent transition-colors resize-none"></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-minimal-text-light text-sm font-medium mb-2">Media Type</label>
            <select v-model="form.media_type" class="w-full bg-minimal-bg border border-minimal-border px-4 py-2.5 rounded-lg text-minimal-text outline-none focus:border-minimal-accent transition-colors">
              <option value="pdf">PDF Document</option>
              <option value="image">Image Display</option>
              <option value="external_link">External Link</option>
            </select>
          </div>
          
          <div v-if="form.media_type !== 'external_link'">
            <label class="block text-minimal-text-light text-sm font-medium mb-2">Upload File</label>
            <input type="file" @change="handleFileDrop" class="w-full text-minimal-text-light text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-minimal-accent file:text-white hover:file:bg-blue-700 transition-colors file:cursor-pointer" />
          </div>
          <div v-else>
            <label class="block text-minimal-text-light text-sm font-medium mb-2">External URL</label>
            <input v-model="form.media_url" type="url" placeholder="https://" class="w-full bg-minimal-bg border border-minimal-border px-4 py-2.5 rounded-lg text-minimal-text outline-none focus:border-minimal-accent transition-colors" />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full py-3 bg-minimal-accent text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 mt-4 cursor-pointer">
          {{ loading ? 'Uploading & Saving...' : 'Deploy Project' }}
        </button>
        <div v-if="statusMessage" :class="[statusIsError ? 'text-red-600' : 'text-green-600', 'text-center text-sm mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100']">
            {{ statusMessage }}
        </div>
      </form>
    </div>

    <!-- Project List Management -->
    <div class="mt-12">
      <h2 class="text-xl font-bold text-minimal-text mb-6">Manage Projects</h2>
      <div v-if="existingProjects.length > 0" class="space-y-4">
        <div v-for="project in existingProjects" :key="project.id" class="bg-white p-5 rounded-xl border border-minimal-border flex justify-between items-center subtle-shadow">
          <div>
            <h4 class="font-bold text-minimal-text">{{ project.title }}</h4>
            <p class="text-xs text-minimal-text-light">{{ project.category }} • {{ project.media_type }}</p>
          </div>
          <button @click="confirmDelete(project.id)" class="p-2 text-minimal-text-light hover:text-red-600 transition-colors cursor-pointer" title="Delete Project">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      </div>
      <div v-else class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-minimal-border text-minimal-text-light">
        No projects found in database.
      </div>
    </div>

    <!-- Tech Stack Management -->
    <div class="mt-20 pt-12 border-t border-minimal-border">
      <h2 class="text-2xl font-bold text-minimal-text mb-8">Manage Tech Stack</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Add Skill Form -->
        <div class="bg-white p-6 rounded-2xl border border-minimal-border subtle-shadow h-fit">
          <h3 class="text-lg font-bold text-minimal-text mb-6">Add New Skill</h3>
          <form @submit.prevent="submitSkill" class="space-y-4">
            <div>
              <label class="block text-minimal-text-light text-xs font-bold uppercase mb-2">Skill Name</label>
              <input v-model="skillForm.name" type="text" required placeholder="e.g. Node.js" class="w-full bg-minimal-bg border border-minimal-border px-4 py-2.5 rounded-lg text-minimal-text outline-none focus:border-minimal-accent transition-colors" />
            </div>
            <div>
              <label class="block text-minimal-text-light text-xs font-bold uppercase mb-2">Icon Image</label>
              <input type="file" @change="handleSkillFile" required class="w-full text-xs text-minimal-text-light file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-minimal-accent file:text-white hover:file:bg-blue-700 transition-colors cursor-pointer" />
            </div>
            <button type="submit" :disabled="skillLoading" class="w-full py-2.5 bg-minimal-text text-white font-medium rounded-lg hover:bg-black transition-colors disabled:opacity-50 mt-2 cursor-pointer text-sm">
              {{ skillLoading ? 'Saving...' : 'Add to Stack' }}
            </button>
          </form>
        </div>

        <!-- Skills List -->
        <div>
          <h3 class="text-lg font-bold text-minimal-text mb-6">Current Stack</h3>
          <div v-if="skills && skills.length > 0" class="grid grid-cols-2 gap-4">
            <div v-for="skill in skills" :key="skill.id" class="relative group bg-white p-4 rounded-xl border border-minimal-border flex flex-col items-center justify-center text-center space-y-2">
              <img :src="skill.icon_url" class="w-10 h-10 object-contain" :alt="skill.name" />
              <span class="text-xs font-bold text-minimal-text-light">{{ skill.name }}</span>
              <button @click="confirmDeleteSkill(skill.id)" class="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm border border-minimal-border text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
          <div v-else class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-minimal-border text-minimal-text-light text-sm">
            Stack is empty.
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Management -->
    <div class="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-minimal-border">
      <h2 class="text-xl md:text-2xl font-bold text-minimal-text mb-8">Manage Profile Photo</h2>
      <div class="bg-white p-6 md:p-8 rounded-2xl border border-minimal-border subtle-shadow">
        <div class="flex flex-col md:flex-row items-center gap-10">
          <div class="relative group">
            <div class="w-32 h-32 rounded-full border-4 border-minimal-gray overflow-hidden bg-gray-100 flex items-center justify-center">
              <img v-if="profileAvatar" :src="profileAvatar" class="w-full h-full object-cover" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>
          <div class="flex-1 space-y-4 w-full">
            <div>
              <label class="block text-minimal-text-light text-sm font-medium mb-2">Change Profile Photo</label>
              <input type="file" @change="handleProfileFile" class="w-full text-sm text-minimal-text-light file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-minimal-accent file:text-white hover:file:bg-blue-700 transition-colors cursor-pointer" />
            </div>
            <button @click="updateProfilePhoto" :disabled="profileLoading || !profileFileToUpload" class="px-6 py-2.5 bg-minimal-text text-white font-medium rounded-lg hover:bg-black transition-colors disabled:opacity-50 text-sm cursor-pointer">
              {{ profileLoading ? 'Updating...' : 'Update Photo' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Certificates Management -->
    <div class="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-minimal-border">
      <h2 class="text-xl md:text-2xl font-bold text-minimal-text mb-8">Manage Certificates</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Add Certificate Form -->
        <div class="bg-white p-6 rounded-2xl border border-minimal-border subtle-shadow h-fit">
          <h3 class="text-lg font-bold text-minimal-text mb-6">Add Achievement</h3>
          <form @submit.prevent="submitCertificate" class="space-y-4">
            <div>
              <label class="block text-minimal-text-light text-xs font-bold uppercase mb-2">Certificate Name</label>
              <input v-model="certForm.name" type="text" required placeholder="e.g. AWS Certified Developer" class="w-full bg-minimal-bg border border-minimal-border px-4 py-2.5 rounded-lg text-minimal-text outline-none focus:border-minimal-accent transition-colors" />
            </div>
            <div>
              <label class="block text-minimal-text-light text-xs font-bold uppercase mb-2">Certificate Image</label>
              <input type="file" @change="handleCertFile" required class="w-full text-xs text-minimal-text-light file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-minimal-accent file:text-white hover:file:bg-blue-700 transition-colors cursor-pointer" />
            </div>
            <button type="submit" :disabled="certLoading" class="w-full py-2.5 bg-minimal-accent text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2 cursor-pointer text-sm">
              {{ certLoading ? 'Uploading...' : 'Add Certificate' }}
            </button>
          </form>
        </div>

        <!-- Certificates List -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-minimal-text mb-6">Current Certificates</h3>
          <div v-if="certificates && certificates.length > 0" class="space-y-4">
            <div v-for="cert in certificates" :key="cert.id" class="group bg-white p-4 rounded-xl border border-minimal-border flex items-center justify-between subtle-shadow">
              <div class="flex items-center space-x-4">
                <div v-if="cert.image_url?.toLowerCase().endsWith('.pdf')" class="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-md border border-minimal-border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                </div>
                <img v-else :src="cert.image_url" class="w-12 h-12 object-cover rounded-md border border-minimal-border" :alt="cert.name" />
                <span class="text-sm font-bold text-minimal-text">{{ cert.name }}</span>
              </div>
              <button @click="confirmDeleteCert(cert.id)" class="p-2 text-minimal-text-light hover:text-red-500 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
          <div v-else class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-minimal-border text-minimal-text-light text-sm">
            No certificates added yet.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'admin',
  layout: 'default'
})

const { addProject, uploadMedia, fetchProjects, deleteProject, fetchSkills, addSkill, deleteSkill, fetchProfile, updateProfile, fetchCertificates, addCertificate, deleteCertificate } = useProjects()

const form = ref({
  title: '',
  description: '',
  category: 'Web Dev',
  media_type: 'external_link',
  media_url: ''
})

const skillForm = ref({
    name: ''
})

const certForm = ref({
    name: ''
})

const fileToUpload = ref(null)
const skillFileToUpload = ref(null)
const profileFileToUpload = ref(null)
const certFileToUpload = ref(null)

const loading = ref(false)
const skillLoading = ref(false)
const profileLoading = ref(false)
const certLoading = ref(false)

const statusMessage = ref('')
const statusIsError = ref(false)
const existingProjects = ref([])
const skills = ref([])
const certificates = ref([])
const profileAvatar = ref(null)

const loadData = async () => {
    const [projectsData, skillsData, profileData, certsData] = await Promise.all([
        fetchProjects(),
        fetchSkills(),
        fetchProfile(),
        fetchCertificates()
    ])
    if (projectsData) existingProjects.value = projectsData
    if (skillsData) skills.value = skillsData
    if (profileData) profileAvatar.value = profileData.avatar_url
    if (certsData) certificates.value = certsData
}

onMounted(loadData)

const handleFileDrop = (e) => {
  if (e.target.files.length > 0) {
    fileToUpload.value = e.target.files[0]
  }
}

const handleSkillFile = (e) => {
  if (e.target.files.length > 0) {
    skillFileToUpload.value = e.target.files[0]
  }
}

const handleProfileFile = (e) => {
  if (e.target.files.length > 0) {
    profileFileToUpload.value = e.target.files[0]
  }
}

const handleCertFile = (e) => {
  if (e.target.files.length > 0) {
    certFileToUpload.value = e.target.files[0]
  }
}

const updateProfilePhoto = async () => {
    if (!profileFileToUpload.value) return
    profileLoading.value = true
    try {
        const ext = profileFileToUpload.value.name.split('.').pop()
        const fileName = `profile_${Date.now()}.${ext}`
        const url = await uploadMedia(profileFileToUpload.value, fileName)
        await updateProfile(url)
        profileAvatar.value = url
        profileFileToUpload.value = null
        alert('Profile photo updated!')
    } catch (e) {
        alert('Failed to update profile: ' + e.message)
    } finally {
        profileLoading.value = false
    }
}

const submitCertificate = async () => {
    if (!certFileToUpload.value) return
    certLoading.value = true
    try {
        const ext = certFileToUpload.value.name.split('.').pop()
        const fileName = `cert_${Date.now()}.${ext}`
        const imageUrl = await uploadMedia(certFileToUpload.value, fileName)
        
        await addCertificate({
            name: certForm.value.name,
            image_url: imageUrl
        })
        
        certForm.value.name = ''
        certFileToUpload.value = null
        await loadData()
    } catch (e) {
        alert('Failed to add certificate: ' + e.message)
    } finally {
        certLoading.value = false
    }
}

const confirmDeleteCert = async (id) => {
    if (confirm('Delete this certificate?')) {
        try {
            await deleteCertificate(id)
            await loadData()
        } catch (e) {
            alert('Error: ' + e.message)
        }
    }
}

const confirmDeleteSkill = async (id) => {
    if (confirm('Delete this skill from stack?')) {
        try {
            await deleteSkill(id)
            await loadData()
        } catch (e) {
            alert('Error: ' + e.message)
        }
    }
}

const confirmDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            await deleteProject(id)
            await loadData()
        } catch (e) {
            alert('Failed to delete: ' + e.message)
        }
    }
}

const submitProject = async () => {
  loading.value = true
  statusMessage.value = ''
  statusIsError.value = false
  
  try {
    let finalMediaUrl = form.value.media_url
    
    if (form.value.media_type !== 'external_link' && fileToUpload.value) {
      statusMessage.value = 'Uploading asset to storage...'
      const ext = fileToUpload.value.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
      finalMediaUrl = await uploadMedia(fileToUpload.value, fileName)
    }
    
    statusMessage.value = 'Inserting into database...'
    const projectData = {
      ...form.value,
      media_url: finalMediaUrl
    }
    
    await addProject(projectData)
    
    statusIsError.value = false
    statusMessage.value = '[SUCCESS] Project successfully deployed.'
    
    // Reset form
    form.value = {
      title: '',
      description: '',
      category: 'Web Dev',
      media_type: 'external_link',
      media_url: ''
    }
    fileToUpload.value = null
    await loadData()
  } catch(e) {
    statusIsError.value = true
    statusMessage.value = `[ERROR] ${e.message || 'Network error fetching supabase'}`
  } finally {
    loading.value = false
  }
}

const submitSkill = async () => {
    if (!skillFileToUpload.value) return
    
    skillLoading.value = true
    try {
        const ext = skillFileToUpload.value.name.split('.').pop()
        const fileName = `skill_${Date.now()}.${ext}`
        const iconUrl = await uploadMedia(skillFileToUpload.value, fileName)
        
        await addSkill({
            name: skillForm.value.name,
            icon_url: iconUrl
        })
        
        skillForm.value.name = ''
        skillFileToUpload.value = null
        await loadData()
    } catch (e) {
        alert('Failed to add skill: ' + e.message)
    } finally {
        skillLoading.value = false
    }
}

const logout = async () => {
    const supabase = useSupabaseClient()
    await supabase.auth.signOut()
    navigateTo('/login')
}
</script>
