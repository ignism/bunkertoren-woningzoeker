<template>
  <div class="filter-levels-container">
    <img class="levels-achtergrond" src="../assets/levels.png" alt="">
    <div class="levels-overlay">
      <div @click="selectLevel(32, $event)" class="story block-4 story-32"></div>
      <div @click="selectLevel(31, $event)" class="story block-4 story-31"></div>
      <div @click="selectLevel(30, $event)" class="story block-4 story-30"></div>
      <div @click="selectLevel(29, $event)" class="story block-4 story-29"></div>
      <div @click="selectLevel(28, $event)" class="story block-4 story-28"></div>
      <div @click="selectLevel(27, $event)" class="story block-4 story-27"></div>
      <div @click="selectLevel(26, $event)" class="story block-4 story-26"></div>
      <div @click="selectLevel(25, $event)" class="story block-4 story-25"></div>
      <div @click="selectLevel(24, $event)" class="story block-4 story-24"></div>
      <div @click="selectLevel(23, $event)" class="story block-4 story-23"></div>
      <div @click="selectLevel(22, $event)" class="story block-4 story-22"></div>
      <div @click="selectLevel(21, $event)" class="story block-4 story-21"></div>
      <div @click="selectLevel(20, $event)" class="story block-4 story-20"></div>
      <div @click="selectLevel(19, $event)" class="story block-4 story-19"></div>
      <div @click="selectLevel(18, $event)" class="story block-4 story-18"></div>
      <div @click="selectLevel(17, $event)" class="story block-4 story-17"></div>
      <div @click="selectLevel(16, $event)" class="story block-4 story-16"></div>
      <div @click="selectLevel(15, $event)" class="story block-4 story-15"></div>
      <div @click="selectLevel(14, $event)" class="story block-4 story-14"></div>
      <div @click="selectLevel(13, $event)" class="story block-4 story-13"></div>
      <div @click="selectLevel(12, $event)" class="story block-4 story-12"></div>
      <div @click="selectLevel(11, $event)" class="story block-4 story-11"></div>
      <div @click="selectLevel(10, $event)" class="story block-4 story-10"></div>
      <div @click="selectLevel(9, $event)" class="story block-4 story-9"></div>
      <div @click="selectLevel(8, $event)" class="story block-3 story-8"></div>
      <div @click="selectLevel(7, $event)" class="story block-3 story-7"></div>
      <div @click="selectLevel(6, $event)" class="story block-3 story-6"></div>
      <div @click="selectLevel(5, $event)" class="story block-3 story-5"></div>
      <div @click="selectLevel(4, $event)" class="story block-3 story-4"></div>
      <div @click="selectLevel(3, $event)" class="story block-2 story-3"></div>
      <div @click="selectLevel(2, $event)" class="story block-2 story-2"></div>
      <div @click="selectLevel(1, $event)" class="story block-1 story-1"></div>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  
  export default {
    name: "FilterLevels",
    props: {
    },
    data: function() {
      return {
      }
    },
    computed: {
    },
    methods: {
      selectLevel: function(index, event) {
        if (store.state.current.level != index) {
          this.removeSelection(false)
          store.commit('setLevel', index)
          store.dispatch('filterApartmentsByLevel')
          event.target.classList.add('active')
        } else {
          this.removeSelection(true)
        }
      },
      removeSelection: function(updateStore = true) {
        let levels = Array.from(document.getElementsByClassName('story'))
  
        levels.forEach(element => {
          element.classList.remove('active')
        });
  
        if (updateStore) {
          store.commit('resetFilters', 0)
          store.commit('setLevel', 0)
          store.dispatch('filterApartmentsByLevel')
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-levels-container {
    position: relative;
  }
  
  .levels-achtergrond {
    width: 100%;
    max-width: auto;
  }
  
  .levels-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: +1;
  }
  
  .story {
    position: relative;
    height: 2.86%;
    display: block;
    width: auto;
    z-index: +2;
    background: rgba(0, 0, 0, 0.25);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .story.active {
    background: rgba(255, 0, 0, 0.25);
    opacity: 1;
  }

  .story.active:hover {
    background: rgba(255, 0, 0, 0.5);
    cursor: pointer;
  }
  
  .story:hover {
    opacity: 1;
  }
  
  .story.block-1 {
    margin-right: 2%;
    margin-left: 2%;
  }
  
  .story.block-2 {
    margin-right: 23.5%;
    margin-left: 23.5%;
  }
  
  .story.block-3 {
    margin-right: 23.5%;
    margin-left: 30.5%;
  }
  
  .story.block-4 {
    margin-right: 23.5%;
    margin-left: 38.5%;
  }
  
  .story-32 {
    margin-top: 4.3%;
  }
</style>
