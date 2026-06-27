<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const { open, title, content, type } = defineProps<{
  open: boolean
  title: string
  content: string
  type: 'ask' | 'noAsk'
}>()

const emit = defineEmits<{
  (e: 'close' | 'confirm'): void
}>()

const modalAction = (action: 'confirm' | 'close') => {
  if (type === 'ask') {
    emit(action)
  } else if (type === 'noAsk') {
    emit('close')
  }
}
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" class="relative z-50" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/10 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-sm transform overflow-hidden rounded-[24px] bg-white p-8 text-center align-middle shadow-[0_20px_50px_rgba(249,89,95,0.15)] transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-xl leading-6 font-black text-[#7A3A3A]"
              >
                {{ title }}
              </DialogTitle>

              <div class="mt-4">
                <p class="text-[15px] leading-relaxed font-bold text-[#A66B6B]">
                  {{ content }}
                </p>
              </div>

              <div class="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-xl border border-transparent bg-[#F9595F] px-6 py-3 text-base font-black text-white shadow-lg shadow-[#F9595F]/30 transition-all hover:bg-[#ff6b71] focus:outline-none active:scale-95"
                  @click="modalAction('confirm')"
                >
                  {{ $t('confirm') }}
                </button>

                <button
                  v-if="type === 'ask'"
                  type="button"
                  class="inline-flex w-full justify-center rounded-xl border border-transparent bg-[#FFE5E5] px-6 py-3 text-base font-black text-[#F9595F] transition-all hover:bg-[#ffd9d9] focus:outline-none active:scale-95"
                  @click="modalAction('close')"
                >
                  {{ $t('cancel') }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
