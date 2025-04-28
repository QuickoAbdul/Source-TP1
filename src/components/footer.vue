<template>
  <footer>
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </footer>
</template>

<script setup>

</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
}
</style>