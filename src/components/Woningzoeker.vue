<template>
  <div class="container is-fluid" :class="{active: hasDetailsOpen}">
    <div class="columns">
      <div class="column is-5">
        <div class="header-container">
          <p class="header-app"><span class="header-top"><span class="constructed-app">{{ getHeader().constructed }}</span>{{ getHeader().top }}</span><br>{{ getHeader().bottom }}</p>
        </div>
      </div>
      <div class="column is-hidden-tablet">
        <FilterLevels />
      </div>  
      <div class="column is-7">
        <div class="filter-container">
          <div class="filter-labels">
            <label class="label">Woningtype</label>
            <label class="label">Oppervlakte</label>
            <label class="label">Prijs</label>
          </div>
  
          <div class="filter-controls">
              <FilterDropdown :target="'type'" />
              <FilterDropdown :target="'area'" />
              <FilterDropdown :target="'price'" />
          </div>
  
        </div>
  
      </div>
    </div>
  
    <div class="columns">
      <div class="column is-5 is-hidden-mobile">
        <FilterLevels />
      </div>
  
      <div class="column is-7 column-overview">
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
      },
      hasDetailsOpen() {
        return store.state.hasDetailsOpen
      },
      isMobile() {
        return (window.innerWidth < 768)
      }
    },
    methods: {
      getHeader: function() {
        let level = store.state.current.level;
  
        if (level == 0) {
          return {
            constructed: 'A',
            top: 'LLE',
            bottom: 'VERDIEPINGEN'
          }
        } else {
          let extension = 'DE'
  
          if (level == 1 || level == 8 || level > 19) {
            extension = 'STE'
          }

          let strLevel = level.toString()
          return {
            constructed: strLevel.substring(0, 1),
            top: strLevel.substring(1) + extension,
            bottom: 'VERDIEPING'
          }
        }
      },
    },
  
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.constructed-app {
  font-family: 'SMMaxeville-Constructed';
}
p.header-app {
  font-size: 45px;
  font-family: 'SMMaxeville-Regular';
  line-height: 0.85em;
}
  .has-border-top {
    border-top: 1px solid black;
  }
  
  .header-container {
    padding: 2em 0;
    border-top: 1px solid black;
  }
  
  .header-top {
    color: #E7413A;
  }
  
  .filter-container {
    display: flex;
    justify-content: flex-start;
    padding: 2em 0;
    border-top: 1px solid black;
  }

  .label {
    margin-bottom: 0;
    padding-bottom: 0.5rem;
    height: 2rem;
    line-height: 2rem;
  }

  .container.active {
    padding-bottom: 0px;
    transition: padding-bottom 400ms ease;
  }

  .container.active {
    padding-bottom: 72px;
  }

  .column-overview {
    min-height: 75vh;
  }

  @media (min-width: 780px) {
    .column-overview {
      min-height: auto;
    }
  }
</style>
