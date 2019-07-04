<template>
  <div class="vole-button">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "VoButton",
  data() {
    return {
      title: "test"
    };
  }
};
</script>

<style scoped>
.vole-button {
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
