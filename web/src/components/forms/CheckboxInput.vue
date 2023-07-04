<script setup lang="ts">
const modelValue = defineModel<boolean>()
</script>
<template>
  <span class="block">
    <input v-model="modelValue" class="custom-checkbox" type="checkbox" />
    <span>
      <svg
        width="27"
        height="19"
        viewBox="0 0 27 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="path"
          d="M1.5 10.165L8.14996 16.878C8.68628 17.414 9.55265 17.414 10.089 16.878L25.5001 1.37012"
          stroke="#FF6147"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </span>
</template>
<style lang="scss" scoped>
.custom-checkbox {
  position: absolute;
  opacity: 0;
  z-index: 1;
  right: 0;
  height: 24px;
  width: 24px;
  &:hover {
    cursor: pointer;
  }
  & + span {
    position: absolute;
    right: 0;
    display: inline-block;
    vertical-align: text-top;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 5px;
    filter: drop-shadow(0px 1px 3px rgba(0, 35, 30, 0.16));
    &:hover {
      cursor: pointer;
    }
  }
  & + span svg {
    position: absolute;
    left: 5px;
    .path {
      stroke-dasharray: 34;
      stroke-dashoffset: 34;
      transition: all 0.3s;
    }
  }
  &:checked + span svg {
    .path {
      stroke-dashoffset: 0;
    }
  }
}
</style>
