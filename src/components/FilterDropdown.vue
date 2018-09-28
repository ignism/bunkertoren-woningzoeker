<template>
  <div class="filter-dropdown">
    <div class="is-hidden-mobile">
      <span @click="toggle()" class="selection">{{ selection }}<img class="caret" src="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/caret.svg" /></span>
      <ul v-show="isOpen">
        <li @click="select(item)" v-for="item in list" :key="item.index">{{ item }}</li>
      </ul>
    </div>
    <div class="is-hidden-tablet">
      <select class="select" name="" id="" @change="setSelection()" v-model="currValue">
        <option v-for="item in list" :key="item.index" :value="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "FilterDropdown",
  props: ["target"],
  data: function() {
    return {
      isOpen: false,
      currValue: "Alle opties"
    };
  },
  computed: {
    selection() {
      return store.state.current[this.target];
    },
    isFaded() {
      return store.state.isFaded;
    },
    list() {
      return store.state.list[this.target];
    }
  },
  methods: {
    toggle: function() {
      store.commit("fadeIn");
      this.isOpen = true;
    },
    select: function(innerText) {
      store.commit("setCurrent", { target: this.target, value: innerText });
      store.commit("fadeOut");
      store.dispatch("filterApartments");
      this.isOpen = false;
      this.currValue = innerText;
    },
    setSelection: function() {
      this.select(this.currValue);
    }
  },
  watch: {
    isFaded: function(value) {
      if (value == false) {
        this.isOpen = false;
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
  -webkit-box-shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.5);
}

.filter-dropdown ul li {
  color: black;
  transition: color 400ms ease;
  cursor: pointer;
}

.filter-dropdown ul li:hover {
  color: #e7413a;
}

.caret {
  margin-left: 0.4em;
  margin-bottom: 0.1em;
}

.select, .selection {
  font-size: 1rem;
  padding-bottom: 0.5rem;
  background: transparent;
  color: #E7413A;
  border: 0;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  height: 2rem;
  line-height: 2rem;
}

.select:focus {
  outline: none;
}
</style>
