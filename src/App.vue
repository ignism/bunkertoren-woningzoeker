<template>
  <div id="app">
    <section class="section" data-background-color="white" style="padding-bottom: 0">
      <div :class="{active: isOverlay()}" class="overlay" v-show="toggleOverlay" @click="fadeOut()"></div>
  
      <div class="loader-overlay" v-show="toggleLoader">
        <div class="content">
          <div class="bunker-loader">
              <div class="part"></div>
              <div class="part"></div>
              <div class="part"></div>
              <div class="part"></div>
              <div class="part"></div>
              <div class="part"></div>
              <div class="part"></div>
          </div>
        </div>
      </div>
  
      <Woningzoeker />
    </section>
    <!-- <section class="section fit-height" style="padding-top: 0">
      <div class="container is-fluid" style="padding-top: 2em; min-height: auto">
        <div class="columns">
          <div class="column is-offset-5">
            <div class="level button-group">
              <div class="level-item"><a target="_blank" href="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/BunkerToren_Brochure.pdf" class="button">Brochure (PDF)</a></div>
              <div class="level-item"><a target="_blank" href="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/BunkerToren_Prijslijst.pdf" class="button">Prijslijst (PDF)</a></div>
              <div class="level-item"><a target="_blank" href="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/BunkerToren_Technische_Omschrijving.pdf" class="button">Specificaties (PDF)</a></div>
            </div>
            <div class="level button-group">
              <div class="level-item"><a target="_blank" href="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/BunkerToren_Verkoop_Procedure.pdf" class="button">Verkoop Procedure (PDF)</a></div>
              <div class="level-item"><a target="_blank" href="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/BunkerToren_Prijslijst.pdf" class="button">Verkoop Tekeningen (PDF)</a></div> 
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import store from './store'
import Woningzoeker from './components/Woningzoeker.vue'

export default {
  name: 'app',
  components: {
    Woningzoeker,
  },
  computed: {
    toggleOverlay() {
      return store.state.isFaded
    },
    toggleLoader() {
      return store.state.isLoading
    },
  },
  methods: {
    fadeOut() {
      store.commit('fadeOut')
    },
    isOverlay() {
      return this.toggleOverlay
    },
  },
  beforeCreate() {
    store.dispatch('init')
  },
}
</script>

<style>
.section {
  position: relative;
}

.loader-overlay {
  background: #f4f0e4;
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
  opacity: 0;
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
