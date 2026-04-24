<template>
  <div class="relative min-h-screen bg-minimal-bg text-minimal-text outline-none" tabindex="-1">
    <slot />
    
    <!-- Secret Developer Terminal -->
    <div v-if="isTerminalOpen" class="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md font-mono p-4 md:p-10 flex flex-col border border-minimal-border">
      <div class="flex justify-between items-center border-b border-minimal-border pb-2 mb-4">
        <div class="text-minimal-text-light text-sm font-bold">developer@macbook:~</div>
        <button @click="isTerminalOpen = false" class="text-minimal-text-light hover:text-red-500 cursor-pointer font-bold">X</button>
      </div>
      <div class="flex-1 overflow-y-auto w-full text-minimal-text text-sm flex flex-col gap-1" @click="focusInput">
        <div v-for="(log, idx) in terminalLogs" :key="idx" v-html="log"></div>
        <div class="flex mt-2 items-center">
          <span class="mr-2 text-minimal-accent font-bold">$</span>
          <input 
            v-model="terminalInput" 
            @keyup.enter="handleTerminalCommand"
            ref="terminalInputRef"
            class="bg-transparent border-none outline-none flex-1 text-minimal-text shadow-none"
            type="text" 
            autofocus 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const isTerminalOpen = ref(false)
const terminalInput = ref('')
const terminalLogs = ref([
  'Portfolio OS v1.0.0 [Build 2026]',
  'Type "help" for available commands.',
])
const terminalInputRef = ref(null)

const handleKeydown = (e) => {
  if (e.key === '`' || e.key === '~') {
    e.preventDefault()
    isTerminalOpen.value = !isTerminalOpen.value
    if (isTerminalOpen.value) {
      nextTick(() => {
        focusInput()
      })
    }
  }
}

const focusInput = () => {
    terminalInputRef.value?.focus()
}

const handleTerminalCommand = () => {
  const cmd = terminalInput.value.trim().toLowerCase()
  terminalLogs.value.push(`<span class="text-white">> ${cmd}</span>`)
  
  if (cmd === 'help') {
    terminalLogs.value.push('Available commands:')
    terminalLogs.value.push('  help    - show this message')
    terminalLogs.value.push('  clear   - clear console')
    terminalLogs.value.push('  login   - go to admin login')
    terminalLogs.value.push('  contact - show contact info')
    terminalLogs.value.push('  exit    - close terminal')
  } else if (cmd === 'clear') {
    terminalLogs.value = []
  } else if (cmd === 'login') {
    terminalLogs.value.push('Navigating to login session...')
    setTimeout(() => {
        isTerminalOpen.value = false
        navigateTo('/login')
    }, 500)
  } else if (cmd === 'contact') {
    terminalLogs.value.push('Email: contact@example.com')
    terminalLogs.value.push('WhatsApp: +1234567890')
  } else if (cmd === 'exit') {
    isTerminalOpen.value = false
  } else if (cmd !== '') {
    terminalLogs.value.push(`Command not found: ${cmd}`)
  }
  
  terminalInput.value = ''
  nextTick(() => {
      focusInput()
  })
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
