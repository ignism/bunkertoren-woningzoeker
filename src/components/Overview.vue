<template>
  <div class="overview-container">
    <div class="heading-wrapper">
      <ul>
        <li class="trow">
          <div class="tcol tcol-woningtype tcol-label" @click="sortByType($event)">Woningtype</div>
          <div class="tcol tcol-type tcol-label" @click="sortByName($event)">Type</div>
          <div class="tcol tcol-oppervlakte tcol-label" @click="sortByArea($event)">Oppervlakte</div>
          <div class="tcol tcol-verdieping tcol-label" @click="sortByLevel($event)">Verdieping</div>
          <div class="tcol tcol-prijs tcol-label" @click="sortByPrice($event)">Prijs</div>
          <div class="tcol tcol-status">Status</div>
        </li>
      </ul>
    </div>
  
    <div class="results-wrapper" :class="{'limit-scroll': openDetails}"> 
      <ul>
        <li :id="item.id" class="trow" v-for="item in results" :key="item.id" @click="toggleApartment($event, item.id)" :class="getTrowStatus(item.status)">
          <div class="tcol tcol-woningtype">{{ item.type.toLowerCase() }}</div>
          <div class="tcol tcol-type">{{ item.name }}</div>
          <div class="tcol tcol-oppervlakte">{{ item.area }} m2</div>
          <div class="tcol tcol-verdieping">{{ item.level }}</div>
          <div class="tcol tcol-prijs">{{ getPrice(item.price) }}</div>
          <div class="tcol tcol-status"><div class="icon-status" :class="getStatus(item.status)"></div></div>
        </li>
      </ul>
      <div v-show="openDetails" class="spacer" style="height: calc(100% - 64px)"></div>
    </div>

    <div v-show="openDetails" class="details-wrapper" :class="{active: openDetails}">
      <ul>
        <li class="trow padding no-border">
          <div class="tcol tcol-detail-header">
            <div class="level">
              <div class="level-item level-left">
            <p class="header-app">{{ currApartment.type }}</p> <h2 class="small">bouwnr. {{ currApartment.number }}</h2>
              </div>
              </div>
              <div class="level">
              <div class="level-item level-left">
                <span class="status" :class="getStatus(currApartment.status)">{{ currApartment.status }}</span>
              </div>
            </div>
          </div>
        </li>
        <li class="trow padding">
          <div class="tcol tcol-text">
            <p>{{ currApartment.text }}</p>
            <a target="_blank" href="https://pdb.eye-move.nl/Contact/ProjectInschrijven/start.html?RecID=97043" class="button interested">inschrijven</a>
          </div>
          <div class="tcol tcol-plan">
            <img :src="currApartment.plan" alt="">
          </div>
        </li>

        <li class="trow padding">
          <div class="tcol tcol-kenmerken">
            <div class="level is-mobile">
              <div class="level-left">Gebruiksopp.</div>
              <div class="level-right">{{ currApartment.area }} m2</div>
            </div>
            <div class="level is-mobile">
              <div class="level-left">Buitenruimte</div>
              <div class="level-right">{{ currApartment.areaOutside }} m2</div>
            </div>
            <div class="level is-mobile">
              <div class="level-left">Verdieping</div>
              <div class="level-right">{{ currApartment.level }}</div>
            </div>
            <div class="level is-mobile">
              <div class="level-left">Aantal kamers</div>
              <div class="level-right">{{ currApartment.rooms }}</div>
            </div>
          </div>
          <div class="tcol tcol-windrichting-first">
            <div class="north">N</div>
            <div class="windrichting">
              <img :class="getRotation(currApartment.name)" src="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/windrichting.svg" alt="">
            </div>
           </div>
          <div class="tcol tcol-aanzichten">
            <div class="level is-mobile">
              <div class="level-left">Noord</div>
              <div class="level-left">Oost</div>
              <div class="level-left">Zuid</div>
              <div class="level-left">West</div>
            </div>
            <img :src="currApartment.sideview" alt="">
          </div>
          <div class="tcol tcol-windrichting-last">
            <div class="north">N</div>
            <div class="windrichting">
              <img :class="getRotation(currApartment.name)" src="http://bunkertoren.nl/site/wp-content/themes/bunkertoren/assets/woningzoeker/windrichting.svg" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../store'
import { tween } from 'popmotion'

export default {
  name: 'Overview',
  components: {},
  data: function() {
    return {
      currDetails: false,
      currApartment: {},
    }
  },
  props: [],
  computed: {
    results() {
      return store.state.filteredApartments
    },
    details() {
      return this.currDetails
    },
    openDetails() {
      return store.state.hasDetailsOpen
    },
  },
  methods: {
    toggleApartment: function(event, id) {
      if (this.openDetails) {
        let item = document.getElementById(id)
        item.classList.remove('active')
        store.commit('hasDetailsOpen', false)
      } else {
        this.currDetails = id
        this.currApartment = store.getters.getApartmentById(id)

        let item = document.getElementById(id)
        item.classList.add('active')

        let results = document.querySelector('.results-wrapper')
        let details = document.querySelector('.details-wrapper')

        let currPos = results.scrollTop
        let offsetPos = item.offsetTop + 1 // +1 to remove fat line

        const updateResults = (v) => (results.scrollTop = v)
        const updateDetails = (v) => (details.style.height = v + '%')

        details.style.height = 0
        details.style.overflow = 'hidden'

        store.commit('hasDetailsOpen', true)

        tween({ from: currPos, to: offsetPos, duration: 400 }).start({
          update: updateResults,
          complete: () => tween({ from: 0, to: 100, duration: 600 }).start(updateDetails),
        })
      }
    },
    getStatus: function(status) {
      if (status) {
        if (status.toLowerCase() === 'beschikbaar') {
          return 'status-green'
        } else if (status.toLowerCase() === 'onder optie') {
          return 'status-orange'
        } else {
          return 'status-red'
        }
      } else {
        return 'undefined'
      }
    },
    getTrowStatus: function(status) {
      if (status) {
        if (status.toLowerCase() === 'beschikbaar') {
          return ''
        } else if (status.toLowerCase() === 'onder optie') {
          return ''
        } else {
          return 'status-unavailable'
        }
      } else {
        return 'undefined'
      }
    },
    getRotation() {
      return 'deg-155'
    },
    getPrice: function(price) {
      let p = price + ''

      if (p.length > 6) {
        let start = p.substring(1, p.length - 3)
        let end = p.substring(p.length - 3)
        let comp = '€1.' + start + '.' + end

        return comp
      } else {
        let start = p.substring(0, p.length - 3)
        let end = p.substring(p.length - 3)
        let comp = '€' + start + '.' + end

        return comp
      }
    },
    removeSorting: function() {
      let elements = document.getElementsByClassName('tcol-label')

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('sorted')
      }
    },
    sortByType: function(event) {
      let element = event.target
      this.removeSorting()

      if (element.classList.contains('ascending')) {
        store.dispatch('sortByType', false)
        element.classList.remove('ascending')
        element.classList.add('descending')
        element.classList.add('sorted')
      } else {
        store.dispatch('sortByType', true)
        element.classList.remove('descending')
        element.classList.add('ascending')
        element.classList.add('sorted')
      }
    },
    sortByName: function(event) {
      let element = event.target
      this.removeSorting()

      if (element.classList.contains('ascending')) {
        store.dispatch('sortByName', false)
        element.classList.remove('ascending')
        element.classList.add('descending')
        element.classList.add('sorted')
      } else {
        store.dispatch('sortByName', true)
        element.classList.remove('descending')
        element.classList.add('ascending')
        element.classList.add('sorted')
      }
    },
    sortByArea: function(event) {
      let element = event.target
      this.removeSorting()

      if (element.classList.contains('ascending')) {
        store.dispatch('sortByArea', false)
        element.classList.remove('ascending')
        element.classList.add('descending')
        element.classList.add('sorted')
      } else {
        store.dispatch('sortByArea', true)
        element.classList.remove('descending')
        element.classList.add('ascending')
        element.classList.add('sorted')
      }
    },
    sortByLevel: function(event) {
      let element = event.target
      this.removeSorting()

      if (element.classList.contains('ascending')) {
        store.dispatch('sortByLevel', false)
        element.classList.remove('ascending')
        element.classList.add('descending')
        element.classList.add('sorted')
      } else {
        store.dispatch('sortByLevel', true)
        element.classList.remove('descending')
        element.classList.add('ascending')
        element.classList.add('sorted')
      }
    },
    sortByPrice: function(event) {
      let element = event.target
      this.removeSorting()

      if (element.classList.contains('ascending')) {
        store.dispatch('sortByPrice', false)
        element.classList.remove('ascending')
        element.classList.add('descending')
        element.classList.add('sorted')
      } else {
        store.dispatch('sortByPrice', true)
        element.classList.remove('descending')
        element.classList.add('ascending')
        element.classList.add('sorted')
      }
    },
  },
  watch: {
    results: function() {
      let elements = document.querySelectorAll('.results-wrapper .trow')

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active')
      }

      let results = document.querySelector('.results-wrapper')
      results.scrollTop = 0
    },
  },
}
</script>

<style>
.overview-container {
  position: relative;
  padding: 0;
  border-top: 1px solid black;
  height: 100%;
  min-height: 75vh;
}

.results-wrapper {
  overflow-y: scroll;
  position: absolute;
  top: 65px;
  bottom: 0;
  left: 0;
  right: 0;
}

.results-wrapper.limit-scroll {
  overflow-y: hidden;
}

.details-wrapper {
  position: relative;
  top: 63px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f4f0e4;
  font-size: 12px;
  opacity: 0;
  z-index: 9990;
}

.details-wrapper.active {
  animation: fadeInDetails 400ms forwards;
  animation-delay: 400ms;
}

@keyframes fadeInDetails {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* .details-shadow {
  width: calc(100% - 64px);
  margin-left: 20px;
  height: 1rem;
  position: absolute;
  top: -2.25rem;
  left: 0;
  box-shadow: 0px 24px 32px -24px rgba(0,0,0,0.5);
} */

.details-shadow {
  width: 100%;
  height: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 24px 32px -24px rgba(0, 0, 0, 0.5);
}

.details-wrapper img {
  width: auto;
  height: auto;
  max-height: 75vh;
}

.details-wrapper .header-app {
  font-size: 30px !important;
  white-space: nowrap;
  margin-bottom: 0;
  margin-right: 1rem;
}

.button.interested {
  font-size: 15px;
  margin-bottom: 14px;
}

@media (max-width: 768px) {
  .details-wrapper .header-app {
    font-size: 20px !important;
  }
  .details-wrapper h2.small {
    font-size: 12px !important;
  }
}

.details-wrapper h2.small {
  font-family: 'OrpheusPro', serif;
  text-transform: capitalize;
  font-size: 16px;
  margin-bottom: 0;
}

.details-wrapper p {
  font-size: 12px;
}

.details-wrapper .level {
  margin-bottom: 0;
  margin-right: 2em;
}

.results-wrapper .trow {
  transition: color 400ms ease;
  position: relative;
}

.results-wrapper .trow.status-unavailable {
  color: rgba(0, 0, 0, 0.5);
}

.results-wrapper .trow:hover,
.results-wrapper .trow.active {
  box-shadow: 0px 24px 32px -24px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 9000;
}

.heading-wrapper .tcol {
  font-size: 12px;
  height: 4rem;
  line-height: 4rem;
}

.results-wrapper .tcol {
  font-size: 16px;
  height: 4rem;
  line-height: 4rem;
  white-space: nowrap;
  background: #f4f0e4;
}

@media (max-width: 768px) {
  .heading-wrapper .tcol {
    font-size: 10px;
  }
  .results-wrapper .tcol {
    font-size: 12px;
  }
}

.details-wrapper .tcol {
  height: auto;
}

.trow {
  display: flex;
  border-bottom: 1px solid black;
  flex-flow: row wrap;
}

.trow.no-border {
  border: 0;
}

.trow.padding {
  padding: 1.5em 0;
}

.tcol-label:hover {
  cursor: pointer;
}

.tcol-label.sorted {
  font-weight: bold;
}

.tcol-woningtype {
  width: 35%;
  text-transform: capitalize;
}
.tcol-type {
  width: 8%;
  text-align: left;
  display: none;
}
.tcol-oppervlakte {
  width: 20%;
  text-align: left;
}
.tcol-verdieping {
  width: 15%;
  text-align: left;
}
.tcol-prijs {
  width: 15%;
  text-align: left;
}
.tcol-status {
  width: 15%;
  text-align: right;
}
.tcol-status .icon-status {
  width: 1em;
  height: 1em;
  border-radius: 0.5em;
  margin-top: 1.5em;
  margin-right: 0.5em;
  margin-left: auto;
}
.icon-status.status-green {
  background: #91ea98;
}
.icon-status.status-orange {
  background: #eec689;
}
.icon-status.status-red {
  background: #ec5a54;
}
.tcol-detail-header {
  width: 100%;
}
.tcol-detail-header .level {
  margin-right: 0;
}
.tcol-detail-header .status {
  font-family: 'OrpheusPro', serif;
  text-transform: capitalize;
  font-size: 16px;
}

@media (max-width: 400px) {
  .tcol-detail-header .level-left {
    display: block;
  }

  .tcol-detail-header .level-left h1 {
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .tcol-detail-header .level-right {
    justify-content: flex-start;
  }
}

.tcol-detail-header .status.status-green {
  color: hsl(125, 68%, 40%);
}
.tcol-detail-header .status.status-orange {
  color: hsl(36, 75%, 40%);
}
.tcol-detail-header .status.status-red {
  color: hsl(2, 80%, 40%);
}

.tcol-text {
  width: 80%;
  margin-right: 20%;
}
.tcol-plan {
  width: 100%;
}
.tcol-kenmerken {
  width: 50%;
  padding-bottom: 2em;
}
.tcol-aanzichten {
  width: 100%;
}
.tcol-windrichting-first {
  margin-left: 20%;
  width: 30%;
  display: block;
}
.tcol-windrichting-last {
  display: none;
}

.deg-155 {
  transform: rotate(155deg);
}

.tcol-aanzichten .level-left {
  width: 25%;
}

.windrichting {
  width: 75%;
  margin-left: 5%;
  float: right;
}

.north {
  width: 20%;
  float: left;
  text-align: right;
  margin-top: 35%;
}

@media (min-width: 1030px) {
  .tcol-woningtype {
    width: 35%;
  }
  .tcol-type {
    width: 10%;
    text-align: left;
    display: block;
  }
  .tcol-oppervlakte {
    width: 15%;
  }
  .tcol-verdieping {
    width: 10%;
  }
  .tcol-prijs {
    width: 20%;
  }
  .tcol-status {
    width: 10%;
  }
  .tcol-text {
    width: 30%;
    margin-right: 5%;
  }
  .tcol-plan {
    width: 65%;
  }
  .tcol-kenmerken {
    width: calc(35% - 20px);
    padding-right: 20px;
  }
  .tcol-aanzichten {
    width: 55%;
  }
  .tcol-windrichting-first {
    display: none;
  }
  .tcol-windrichting-last {
    width: 10%;
    display: block;
  }
}
</style>
