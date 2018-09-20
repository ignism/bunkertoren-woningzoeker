<template>
  <div class="filter-dropdown">
    <span @click="toggle()" class="selection">{{ selection }}<img class="caret" src="../assets/caret.svg" /></span>
    <ul v-show="isOpen">
      <li @click="select($event)" v-for="item in list" :key="item.index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
  import store from '../store'
  
  export default {
    name: "FilterDropdown",
    props: ['target'],
    data: function() {
      return {
        isOpen: false,
      }
    },
    computed: {
      selection() {
        return store.state.current[this.target]
      },
      isFaded() {
        return store.state.isFaded
      },
      list () {
        return store.state.list[this.target]
      }
    },
    methods: {
      toggle: function() {
        store.commit('fadeIn')
        this.isOpen = true;
      },
      select: function(event) {
        let innerText = event.target.innerText
        store.commit('setCurrent', { target: this.target, value: innerText })
        store.commit('fadeOut')
        store.dispatch('filterApartments')
        this.isOpen = false;
      },
    },
    watch: {
      isFaded: function (value) {
        if (value == false) {
          this.isOpen = false
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-dropdown {
    position: relative;
    margin-left: 1em;
  }
  
  .filter-dropdown ul {
    top: -1em;
    left: -1em;
    width: 240px;
    background: white;
    position: absolute;
    z-index: 9999;
    padding: 1em;
  }

  .filter-dropdown ul li {
    color: black;
  }
  
  .filter-dropdown ul li:hover {
    color: red;
  }

  .caret {
    margin-left: 0.4em;
    margin-bottom: 0.1em;
  }
</style>
