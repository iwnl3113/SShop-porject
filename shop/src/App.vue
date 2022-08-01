<template>
  <router-view/>
</template>


<script>
import HomeView from '../src/views/HomeView.vue';
export default {
  name: 'App',
  components: {
    HomeView
  }
}
</script>



<style>
*{
  margin:0px;
  padding: 0px;
}
</style>
