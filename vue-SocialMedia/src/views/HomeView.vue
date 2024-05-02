<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from '../components/Home.vue';

export default {
  components: {
    Home
  }
};
</script>

<style>
  .post_card{
    margin-bottom: 10px;
    width: 60vw;
  }

  .comment_count{
    color: gray;
  }

  .comment_count{
    
  }

  .scoll{
    height: 35vh;
    overflow-y:auto;
  }
</style>