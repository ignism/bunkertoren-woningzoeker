import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(axios)

export default new Vuex.Store({
  state: {
    count: 32,
    list: {
      type: ['Alle opties', 'Maaskant', 'Studio', 'Rudolph', 'Ando', 'Powerhouse', 'Goldfinger', 'Broek & Bakema', 'Acacia', 'Bancroft', 'Breuer', 'Cedar', 'Chestnut', 'Da Rocha', 'Hazel', 'Lautner', 'Locust', 'Locust Executive', 'Locust Royale', 'Luder', 'Maple', 'Maple Executive', 'Maple royale', 'Niemeyer', 'Oak'],
      area: ['Alle opties', '40m2 — 60m2', '60m2 — 80m2', '80m2 — 100m2', '100m2 — 120m2', '120m2 — 140m2', '140m2 — 160m2'],
      price: ['Alle opties', '€200.000 — €300.000', '€300.000 — €400.000', '€400.000 — €500.000', '€500.000 — €600.000', '€600.000 — €700.000']
    },
    current: {
      type: 'Alle opties',
      area: 'Alle opties',
      price: 'Alle opties',
      level: 0
    },
    isFaded: false,
    isLoading: true,
    hasDetailsOpen: false,
    apartments: [],
    filteredApartments: []
  },
  mutations: {
    setCurrent (state, data) {
      state.current[data.target] = data.value

      // TODO: main filter function implementation
      state.hasDetailsOpen = false
    },
    setLevel (state, level) {
      state.current.level = level

      // TODO: main filter function implementation
      state.hasDetailsOpen = false
      return
    },
    setApartments (state, apartments) {
      state.apartments = apartments
    },
    setFilteredApartments (state, apartments) {
      state.filteredApartments = apartments
    },
    isLoading (state, loading) {
      state.isLoading = loading
    },
    hasDetailsOpen (state, details) {
      state.hasDetailsOpen = details
    },
    fadeIn (state) {
      state.isFaded = true;
    },
    fadeOut (state) {
      state.isFaded = false;
    },
    resetFilters (state) {
      state.current.type = 'Alle opties'
      state.current.area = 'Alle opties'
      state.current.price = 'Alle opties'
    }
  },
  getters: {
    getApartmentById: (state) => (id) => {
      let apartment = {}

      state.apartments.forEach((item) => {
        if (parseInt(item.id) === parseInt(id)) {
          // eslint-disable-next-line
          console.log(item)
          apartment = item
        }
      })

      return apartment
    }
  },
  actions: {
    init (context) {
      axios
        .get('http://bunkertoren.test/site/wp-json/woningzoeker/v1/apartments')
        .then((response) => {
          context.commit('setApartments', response.data)
          context.commit('setFilteredApartments', response.data)
          context.commit('isLoading', false)
        })
    },
    filterApartments (context) {
      let result = context.state.apartments

      if (context.state.current.type !== 'Alle opties') {
        result = result.filter(apartment => apartment.type === context.state.current.type.toUpperCase())
      }

      if (context.state.current.area !== 'Alle opties') {
        switch (context.state.current.area) {
          case '40m2 — 60m2':
            result = result.filter(apartment => (apartment.area < 60))
            break;
          case '60m2 — 80m2':
            result = result.filter(apartment => (apartment.area > 60 && apartment.area < 80))
            break;
          case '80m2 — 100m2':
            result = result.filter(apartment => (apartment.area > 80 && apartment.area < 100))
            break;
          case '100m2 — 120m2':
            result = result.filter(apartment => (apartment.area > 100 && apartment.area < 120))
            break;
          case '120m2 — 140m2':
            result = result.filter(apartment => (apartment.area > 120 && apartment.area < 140))
            break;
          case '140m2 — 160m2':
            result = result.filter(apartment => (apartment.area > 140))
            break;
        }
      }

      if (context.state.current.price !== 'Alle opties') {
        switch (context.state.current.price) {
          case '€200.000 — €300.000':
            result = result.filter(apartment => (apartment.price < 300000))
            break;
          case '€300.000 — €400.000':
            result = result.filter(apartment => (apartment.price > 300000 && apartment.price < 400000))
            break;
          case '€400.000 — €500.000':
            result = result.filter(apartment => (apartment.price > 400000 && apartment.price < 500000))
            break;
          case '€500.000 — €600.000':
            result = result.filter(apartment => (apartment.price > 500000 && apartment.price < 600000))
            break;
          case '€600.000 — €700.000':
            result = result.filter(apartment => (apartment.price > 600000))
            break;
        }
      }

      context.state.filteredApartments = result
    },
    filterApartmentsByLevel (context) {
      if (context.state.current.level > 0) {
        let result = context.state.apartments.filter(apartment => apartment.level == context.state.current.level)

        context.state.filteredApartments = result
      } else {
        context.state.filteredApartments = context.state.apartments
      }

      context.commit('resetFilters')
    }
  }
})
