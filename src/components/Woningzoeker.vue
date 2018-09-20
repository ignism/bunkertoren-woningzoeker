<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-5">
        <div class="header-container">
          <h1><span class="header-top">{{ getHeader().top }}</span><br>{{ getHeader().bottom }}</h1>
        </div>
      </div>
  
      <div class="column is-7">
        <div class="filter-container">
          <div class="filter-labels">
            <label class="label">Woningtype</label>
            <label class="label">Oppervlakte</label>
            <label class="label">Prijs</label>
          </div>
  
          <div class="filter-controls">
            <div class="control">
              <FilterDropdown :target="'type'" />
            </div>
  
            <div class="control">
              <FilterDropdown :target="'area'" />
            </div>
  
            <div class="control">
              <FilterDropdown :target="'price'" />
            </div>
          </div>
  
        </div>
  
      </div>
    </div>
  
    <div class="columns">
      <div class="column is-5">
        <FilterLevels />
      </div>
  
      <div class="column is-7">
        <Overview />
      </div>
    </div>
  
  </div>
</template>

<script>
  import store from '../store'
  import FilterLevels from './FilterLevels.vue'
  import FilterDropdown from './FilterDropdown.vue'
  import Overview from './Overview.vue'
  
  export default {
    name: "Woningzoeker",
    components: {
      FilterLevels,
      FilterDropdown,
      Overview
    },
    props: {
      msg: String
    },
    data: function() {
      return {
        message: {
          left: 'left',
          right: 'right'
        },
        // toggleOverlay: false,
      }
    },
    computed: {
      count() {
        return store.state.count
      },
      toggleOverlay() {
        return store.state.isFaded
      },
      toggleLoader() {
        return store.state.isLoading
      }
    },
    methods: {
      getHeader: function() {
        let level = store.state.current.level;
  
        if (level == 0) {
          return {
            top: 'ALLE',
            bottom: 'VERDIEPINGEN'
          }
        } else {
          let extension = 'DE'
  
          if (level == 1 || level == 8 || level > 19) {
            extension = 'STE'
          }
          return {
            top: level + extension,
            bottom: 'VERDIEPING'
          }
        }
  
      },
    },
    beforeMount() {
      store.dispatch('init')
    }
  
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .has-border-top {
    border-top: 1px solid black;
  }
  
  .header-container {
    padding: 2em 0;
    border-top: 1px solid black;
  }
  
  .header-top {
    color: red;
  }
  
  .filter-container {
    display: flex;
    justify-content: flex-start;
    padding: 2em 0;
    border-top: 1px solid black;
  }

  .control {
    margin-bottom: 0.5em;
    color: red;
  }
</style>
