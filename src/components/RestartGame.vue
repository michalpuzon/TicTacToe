<template>
  <div class="game__action">
    <button @click="onClick">Restart Game</button>
  </div>
</template>

<script>
export default {
  methods: {
    onClick(){
      this.$emit("click");
    }
  }
};
</script>

<style scoped></style>
