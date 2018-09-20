<template>
  <div class="overview-container">
    <div class="heading-wrapper">
      <table>
        <thead>
          <tr>
            <th>Woningtype</th>
            <th>Type</th>
            <th>Oppervlakte</th>
            <th>Verdieping</th>
            <th>Prijs</th>
            <th>Status</th>
          </tr>
        </thead>
      </table>
    </div>
  
    <div class="results-wrapper">
      <table>
        <tr v-for="item in results" :key="item.id" @click="toggleApartment($event, item.id)">
          <td>{{ item.type }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.area }} m2</td>
          <td>{{ item.level }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </table>
    </div>

    <div v-show="openDetails" class="details-wrapper">

      <table>
        <tr>
          <td>          
            <h1>{{ currApartment.type }}</h1>
            <p>{{ currApartment.text }}</p></td>
          <td>
            <img :src="currApartment.map" alt="">
          </td>
        </tr>
      </table>
      
      <table>
        <tr>
          <td>
            <div class="level">
              <div class="level-left">Gebruiksopp.</div>
              <div class="level-right">{{ currApartment.area }}</div>
            </div>
            <div class="level">
              <div class="level-left">Buitenruimte</div>
              <div class="level-right">{{ currApartment.areaOutside }}</div>
            </div>
            <div class="level">
              <div class="level-left">Verdieping</div>
              <div class="level-right">{{ currApartment.level }}</div>
            </div>
            <div class="level">
              <div class="level-left">Aantal kamers</div>
              <div class="level-right">{{ currApartment.rooms }}</div>
            </div>
          </td>
          <td>aanzichten</td>
          <td>windrichting</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { tween } from "popmotion";

export default {
  name: "Overview",
  components: {},
  data: function() {
    return {
      currDetails: 0,
      currApartment: {}
    };
  },
  props: [],
  computed: {
    results() {
      return store.state.filteredApartments;
    },
    details() {
      return this.currDetails;
    },
    openDetails() {
      return store.state.hasDetailsOpen
    }
  },
  methods: {
    toggleApartment: function(event, id) {
      if (this.openDetails) {
        store.commit('hasDetailsOpen', false)
      } else {
        this.currDetails = id;
        this.currApartment = store.getters.getApartmentById(id);
        
        store.commit('hasDetailsOpen', true)

        let item = event.target;
        let wrapper = document.querySelector(".results-wrapper");

        let currPos = wrapper.scrollTop;
        let offsetPos = item.offsetTop + 1; // +1 to remove fat line

        const updateWrapper = v => (wrapper.scrollTop = v);

        tween({ from: currPos, to: offsetPos, duration: 400 }).start(
          updateWrapper
        );
      }
    }
  }
};
</script>

<style>
.overview-container {
  position: relative;
  padding: 0;
  border-top: 1px solid black;
  min-height: 60vh;
  height: 60vh;
  max-height: 100vh;
}

.results-wrapper {
  overflow-y: scroll;
  position: absolute;
  top: 64px;
  bottom: 0;
  left: 0;
  right: 0;
}

.details-wrapper {
  position: absolute;
  top: 129px;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding-top: 2em;
}

.details-wrapper img {
  width: auto;
  height: auto;
  max-height: 75vh;
}

.details-wrapper h1 {
  font-size: 30px;
}

.details-wrapper p {
  font-size: 12px;
}

.details-wrapper .level {
  margin-bottom: 0;
  margin-right: 2em;
}

table {
  width: 100%;
}

.results-wrapper tr {
  height: 4em;
  line-height: 4em;
  border-bottom: 1px solid black;
}

thead {
  font-size: 0.8em;
}

thead tr {
  height: 5em;
  line-height: 5em;
  border-bottom: 1px solid black;
}
</style>
