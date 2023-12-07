<template>
  <div class="index-container">
    <div class="index-menu"></div>
    <div class="index-nav"></div>
    <div class="index-app">
      <div class="app-main"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.index-container {
  width: 100%;
  height: 100vh;
  .index-menu {
    width: 300px;
    height: 100%;
    background-color: aqua;
  }
  .index-nav {
    width: calc(100% - 300px);
    height: 80px;
    background-color: blue;
    position: fixed;
    left: 300px;
    top: 0;
  }
  .index-app {
    width: calc(100% - 300px);
    height: calc(100% - 80px);
    background-color: gold;
    position: absolute;
    left: 300px;
    top: 80px;
    overflow: auto;
  }
}
</style>
