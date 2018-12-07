import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  curPageName: 'Login',
  curTab: -1,
  userName: '',
  userPhone: '',
  company: '',
  userId: '',
  role: 2,
  spinner: false,
  jicaiList: [],
  fengbianList: [],
  lashouList: [],
  wenluList: [],
  xinghaoList: [],
  zaoxingList: [],
  curGongXu: {}
}
// actions
const actions = {
  changeCurPageName ({commit, state}, NAME) {
    commit('setCurPageName', NAME)
  },
  changeCurTab ({commit, state}, IDX) {
    commit('setCurTab', IDX)
  },
  changeUserId ({commit, state}, ID) {
    commit('setUserId', ID)
  },
  changeUserName ({commit, state}, USENAME) {
    commit('setUserName', USENAME)
  },
  changeCompany ({commit, state}, COMPANY) {
    commit('setCompany', COMPANY)
  },
  changeUserPhone ({commit, state}, USEPHONE) {
    commit('setUserPhone', USEPHONE)
  },
  changeRole ({commit, state}, STATUS) {
    commit('setRole', STATUS)
  },
  updateSelectList ({commit, state}, INFO) {
    commit('SelectList', INFO)
  },
  toggleSpinner ({commit, state}, STATUS) {
    commit('setSpinner', STATUS)
  },
  updateCurGongXu ({commit, state}, INFO) {
    commit('setCurGongXu', INFO)
  }
}

// mutations
const mutations = {
  setCurPageName (state, NAME) {
    state.curPageName = NAME
  },
  setCurTab (state, IDX) {
    state.curTab = IDX
  },
  setUserId (state, ID) {
    state.userId = ID
  },
  setUserName (state, USENAME) {
    state.userName = USENAME
  },
  setCompany (state, COMPANY) {
    state.company = COMPANY
  },
  setUserPhone (state, USEPHONE) {
    state.userPhone = USEPHONE
  },
  setRole (state, STATUS) {
    state.role = STATUS
  },
  SelectList (state, INFO) {
    state[INFO.property] = INFO.data
  },
  setSpinner (state, STATUS) {
    state.spinner = STATUS
  },
  setCurGongXu (state, INFO) {
    state.curGongXu = INFO
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  // getters,
  actions,
  mutations,
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
