<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="skill in skills" :key="skill.id" class="flex flex-col items-center justify-center p-4 bg-white border border-minimal-border rounded-xl subtle-shadow hover:shadow-md transition-shadow">
      <div class="w-10 h-10 flex items-center justify-center mb-2">
          <img :src="skill.icon_url" :alt="skill.name" class="w-full h-full object-contain" />
      </div>
      <span class="text-[10px] font-bold uppercase tracking-tight text-minimal-text-light">{{ skill.name }}</span>
    </div>
    
    <div v-if="skills.length === 0" class="col-span-full py-10 text-center text-xs text-minimal-text-light border border-dashed border-minimal-border rounded-xl">
      Tech stack is empty. Add items from the admin dashboard.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { fetchSkills } = useProjects()
const skills = ref([])

onMounted(async () => {
    try {
        const data = await fetchSkills()
        if (data && data.length > 0) {
            skills.value = data
        }
    } catch (e) {
        console.error('Skill load error:', e)
    }
})
</script>
