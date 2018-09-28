<template>
  <div class="filter-levels-container">
    <img class="levels-achtergrond" src="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/levels.png" alt="">
    <div class="levels-overlay">
      <div :id="randomHash" class="pointer">
        <div class="list">
          <div class="line"></div>
          <ul>
            <li v-for="item in apartmentsOnLevel" :key="item.id" :class="getStatus(item.status)">{{ item.type }}</li>
          </ul>
          <div class="line"></div>
        </div>
      </div>
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
      <div class="hidden story block-4 story-22"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-21"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-20"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-19"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-18"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-17"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-16"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-15"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-14"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-13"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-12"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-11"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-4 story-10"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div @click="selectLevel(9, $event)" class="story block-4 story-9"></div>
      <div class="hidden story block-3 story-8"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-3 story-7"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-3 story-6"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div class="hidden story block-3 story-5"><div class="hidden-story-message">huurwoningen – later beschikbaar</div></div>
      <div @click="selectLevel(4, $event)" class="story block-3 story-4"></div>
      <div @click="selectLevel(3, $event)" class="story block-2 story-3"></div>
      <div @click="selectLevel(2, $event)" class="story block-2 story-2"></div>
      <div @click="selectLevel(1, $event)" class="story block-1 story-1"></div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "FilterLevels",
  props: {},
  data: function() {
    return {
      randomHash:  0
    }
  },
  computed: {
    apartmentsOnLevel() {
      return store.state.filteredApartments;
    },
    currType() {
      return store.state.current.type
    },
    currArea() {
      return store.state.current.area
    },
    currPrice() {
      return store.state.current.price
    }
  },
  methods: {
    selectLevel: function(index, event) {
      if (store.state.current.level != index) {
        let result = this.removeSelection(false);
        // eslint-disable-next-line
        console.log(result)

        store.commit("setLevel", index);
        store.dispatch("filterApartmentsByLevel");
        event.target.classList.add("active");

        let pointer = document.getElementById(this.randomHash);
        let list = document.querySelector("#" + this.randomHash + " .list");
        let lines = document.querySelectorAll("#" + this.randomHash + " .list .line");
        let story = event.target;

        if (window.innerWidth < 768) {
          if (story.classList.contains("block-1")) {
            pointer.style.width = "calc(23.5% + 10% - 20px)";
            pointer.style.marginLeft = "-10%"
            list.style.top = "auto";
            list.style.bottom = "" + story.clientHeight + "px";
            lines[0].classList.remove("active");
            lines[1].classList.remove("active");
          } else if (story.classList.contains("block-2")) {
            pointer.style.width = "calc(23.5% + 10% - 20px)";
            pointer.style.marginLeft = "-10%"
            list.style.top = "auto";
            list.style.bottom = "-" + story.clientHeight + "px";
            lines[0].classList.remove("active");
            lines[1].classList.add("active");
          } else if (story.classList.contains("block-3")) {
            pointer.style.width = "calc(30.5% + 10% - 20px)";
            pointer.style.marginLeft = "-10%"
            list.style.top = "auto";
            list.style.bottom = "-" + story.clientHeight + "px";
            lines[0].classList.remove("active");
            lines[1].classList.add("active");
          } else if (story.classList.contains("story-9")) {
            pointer.style.width = "calc(30.5% + 10% - 20px)";
            pointer.style.marginLeft = "-10%"
            list.style.top = "auto";
            list.style.bottom = "-" + story.clientHeight + "px";
            lines[0].classList.remove("active");
            lines[1].classList.add("active");
          } else if (story.classList.contains("block-4")) {
            pointer.style.width = "calc(38.5% + 10% - 20px)";
            pointer.style.marginLeft = "-10%"
            list.style.top = 0;
            list.style.bottom = "auto";
            lines[0].classList.add("active");
            lines[1].classList.remove("active");
          } 
        } else {
          if (story.classList.contains("block-1")) {
            pointer.style.width = "calc(23.5% - 20px)";
            list.style.top = "auto";
            list.style.bottom = "" + story.clientHeight + "px";
            lines[0].classList.remove("active");
            lines[1].classList.remove("active");
          } else if (story.classList.contains("block-2")) {
            pointer.style.width = "calc(23.5% - 20px)";
            list.style.top = "auto";
            list.style.bottom = "-" + story.clientHeight + "px";
            lines[0].classList.remove("active");
            lines[1].classList.add("active");
          } else if (story.classList.contains("block-3")) {
            pointer.style.width = "calc(30.5% - 20px)";
            list.style.top = "auto";
            list.style.bottom = "-" + story.clientHeight + "px";
            lines[0].classList.remove("active");
            lines[1].classList.add("active");
          } else if (story.classList.contains("story-9")) {
            pointer.style.width = "calc(30.5% - 20px)";
            list.style.top = "auto";
            list.style.bottom = "-" + story.clientHeight + "px";
            lines[0].classList.remove("active");
            lines[1].classList.add("active");
          } else if (story.classList.contains("block-4")) {
            pointer.style.width = "calc(38.5% - 20px)";
            list.style.top = 0;
            list.style.bottom = "auto";
            lines[0].classList.add("active");
            lines[1].classList.remove("active");
          }
        }

        pointer.style.top = story.offsetTop + "px";
        pointer.classList.add("active");
      } else {
        this.removeSelection(true);
      }
    },
    removeSelection: function(updateStore = true) {
      let pointer = document.getElementById(this.randomHash);
      let lines = document.querySelectorAll("#" + this.randomHash + " .list .line");
      lines[0].classList.remove("active");
      lines[1].classList.remove("active");

      pointer.classList.remove("active");

      let levels = Array.from(document.getElementsByClassName("story"));

      levels.forEach(element => {
        element.classList.remove("active");
      });


      if (updateStore) {
        store.commit("setLevel", 0);
        store.dispatch("filterApartmentsByLevel");
        store.commit("resetFilters", 0);
      } 
    },
    removeLevelSelection: function() {
      let pointer = document.getElementById(this.randomHash);
      let lines = document.querySelectorAll("#" + this.randomHash + " .list .line");
      lines[0].classList.remove("active");
      lines[1].classList.remove("active");
      pointer.classList.remove("active");

      let levels = Array.from(document.getElementsByClassName("story"));

      levels.forEach(element => {
        element.classList.remove("active");
      });

      store.commit("setLevel", 0);
    },
    getStatus: function(status) {
      if (status.toLowerCase() === "beschikbaar") {
        return "status-green";
      } else if (status.toLowerCase() === "onder optie") {
        return "status-orange";
      } else {
        return "status-red";
      }
    }
  },
  beforeMount() {
    let d = new Date()
    let n = d.getMilliseconds()
    let rh = Math.floor(Math.random(n) * 10000)
    this.randomHash = 'hash' + rh
  },
  watch: {
    currType: function(val) {
      if (val !== 'Alle opties') {
        this.removeLevelSelection()
      }
    },
    currArea: function(val) {
      if (val !== 'Alle opties') {
        this.removeLevelSelection()
      }
    },
    currPrice: function(val) {
      if (val !== 'Alle opties') {
        this.removeLevelSelection()
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter-levels-container {
  position: relative;
  width: 70vw;
  margin: auto;
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
  height: 2.85%;
  display: block;
  width: auto;
  z-index: +2;
  background: rgba(236, 90, 84, 0.5);
  /* background: rgba(238, 198, 137, 0.75); */
  opacity: 0;
  transition: opacity 200ms ease;
}
.story.hidden {
  background: transparent;
  font-size: 12px;
  overflow-y: visible;
  /* width: 100% !important; */
  /* margin: 0 !important; */
  text-align: center;
  color: white;
  text-shadow: 1px 1px black;
  display: flex;
  align-items: center;
}

.hidden-story-message {
  width: 100%;
  display: flex;
  justify-content: center;
}

.story.hidden:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.5);
  cursor: not-allowed;
}

.story.active {
  background: rgba(236, 90, 84, 0.5);
  opacity: 1;
}

.story.active:hover {
  background: rgba(236, 90, 84, 0.75);
  cursor: pointer;
}

.story:not(.hidden):hover {
  opacity: 1;
  cursor: pointer;
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

.pointer {
  width: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  display: none;
}
.pointer.active {
  display: block;
  opacity: 1;
}

.pointer.active .list {
  animation: fadeInList 400ms forwards;
}

@keyframes fadeInList {
  from {
    margin-left: 0.5rem;
    opacity: 0;
  }
  to {
    margin-left: 0;
    opacity: 1;
  }
}

.pointer .list {
  position: absolute;
  font-size: 12px;
  width: 100%;
  opacity: 0;
  transition: opacity 400ms ease;
}

.pointer .list .line {
  width: 100%;
  height: 1px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  background: black;
  opacity: 0;
}

.pointer .list .line.active {
  opacity: 1;
}

.pointer .list li {
  white-space: nowrap;
  position: relative;
}



.pointer .list li.status-green::before {
  background: #91EA98;
}
.pointer .list li.status-orange::before {
  background: #EEC689;
}
.pointer .list li.status-red::before {
  background: rgb(236, 90, 84);
}

.pointer .list li::before {
  background: transparent;
  content: '';
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  top: 0.45em;
  left: -1em;
  position: absolute;
}

.pointer .name {
  white-space: nowrap;
}

@media (min-width: 780px) {
  .filter-levels-container {
    width: 100%;
  }
}
</style>
