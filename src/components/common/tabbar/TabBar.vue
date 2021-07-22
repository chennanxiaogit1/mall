<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tab-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  text-align: center;

  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;

  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}
</style>