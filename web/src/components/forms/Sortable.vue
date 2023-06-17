<script setup lang="ts" generic="T">
import { computed, onMounted, PropType, ref, toRefs } from 'vue'
import Sortable from 'sortablejs'

const props = defineProps({
  modelValue: {
    type: Array as PropType<T[]>,
    required: true,
  },
  itemKey: {
    type: String,
    default: 'key',
  },
  sortableOptions: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:modelValue'])
const { modelValue, itemKey } = toRefs(props)

const isTransitionning = ref(false)
const items = computed({
  get() {
    return modelValue.value
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
const sortableWrapper = ref<any>(null)

const setItemsOrder = (newOrder: string[]) => {
  const order: {
    [key: string]: number
  } = {}
  newOrder.forEach(function (a, i) {
    order[a] = i
  })
  const updatedItems = [...items.value]
  updatedItems.sort(function (a: any, b: any) {
    return (
      order[a[itemKey?.value].toString()] - order[b[itemKey?.value].toString()]
    )
  })
  items.value = updatedItems
}
onMounted(() => {
  const sortableEl = sortableWrapper.value.$el
  const options = props.sortableOptions
  options.animation = options.animation ?? 200
  Sortable.create(sortableEl, {
    ...options,
    onEnd() {
      // Serialize HTML positions to data
      const elements = Array.from(sortableEl.querySelectorAll('[data-id]'))
      const newOrder = elements.map((el: any) => el.dataset.id)
      setItemsOrder(newOrder)
    },
  })
})
</script>
<template>
  <TransitionGroup
    ref="sortableWrapper"
    name="drag-list"
    tag="div"
    @transitionstart="isTransitionning = true"
    @transitionend="isTransitionning = false"
  >
    <div
      v-for="(item, idx) in items"
      :key="item[itemKey]"
      :data-id="item[itemKey]"
      class="sortable-item"
    >
      <slot name="item" :item="item" :idx="idx"></slot>
    </div>
  </TransitionGroup>
</template>
<style>
.sortable-ghost {
  visibility: hidden;
}

.drag-list-enter-active,
.drag-list-leave-active,
.drag-list-move {
  transition-property: opacity, transform;
  @apply transition duration-200;
}
.drag-list-move {
  @apply duration-300 ease-in-out-cubic;
}

.drag-list-enter-from,
.drag-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.drag-list-leave-active {
  position: absolute;
  width: 100%;
  /*visibility: hidden;*/
}
</style>
