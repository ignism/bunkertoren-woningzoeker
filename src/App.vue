<template>
  <div id="app">
    <section class="section" data-background-color="white">
      <div class="overlay" v-show="toggleOverlay" @click="fadeOut()"></div>
  
      <div class="loader-overlay" v-show="toggleLoader">
        <div class="loader"></div>
      </div>
  
      <Woningzoeker />
    </section>
  </div>
</template>

<script>
  import store from './store'
  import Woningzoeker from './components/Woningzoeker.vue'
  
  export default {
    name: "app",
    components: {
      Woningzoeker
    },
    computed: {
      toggleOverlay() {
        return store.state.isFaded
      },
      toggleLoader() {
        return store.state.isLoading
      }
    },
    methods: {
      fadeOut() {
        store.commit('fadeOut')
      }
    }
  }
</script>

<style>
  .section {
    position: relative;
  }
  .loader-overlay {
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
  }
  
  .overlay {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9997;
  }
  
  .overlay.active {
    display: block;
    animation: fadeIn 200ms forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
