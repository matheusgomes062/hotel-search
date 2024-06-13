<script setup lang="ts">
import { computed } from 'vue'
import { errorMessages } from 'vue/compiler-sfc'
import type { InputProps } from '@/types/index.d.ts'
import LabelComponent from './LabelComponent.vue'

const props = withDefaults(defineProps<InputProps>(), {
  label: '',
  type: 'text',
  placeholder: '',
  errorMessage: '',
  prependIcon: '',
  appendIcon: '',
  required: false,
  size: 'md',
  success: false,
  error: false,
  disabled: false,
  inputClass: 'p-2 rounded-md outline-none outline-none border w-full'
})
defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const modelValue = defineModel<string | number>()

const id = self.crypto.randomUUID()
const name = self.crypto.randomUUID()

const showClearable = computed(() => props.clearable && modelValue.value && !props.disabled)

const clearInput = () => {
  if (!props.clearable) return
  modelValue.value = undefined
}

function getClasses(success: any, error: any) {
  let isValidValue

  if (error) {
    isValidValue = 'border-2 border-destructive'
  } else if (success) {
    isValidValue = 'border-2 border-success'
  } else {
    isValidValue = 'border-gray-300 '
  }

  return ` ${isValidValue}`
}
</script>

<template>
  <div>
    <LabelComponent :id="id" :error="error" :success="success">
      <slot name="label">
        {{ label }}
      </slot>
    </LabelComponent>
    <div
      :class="{
        'text-destructive': error,
        'text-success': success
      }"
    >
      <input
        :id="id"
        v-model="modelValue"
        :type="type"
        :name="name"
        :class="[getClasses(success, error), inputClass]"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :data-test="dataTest"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @input="$emit('input', $event)"
      />
    </div>
    <span v-if="errorMessages" class="text-destructive text-sm italic"> {{ errorMessage }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
