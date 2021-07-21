import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    userGroup:'',
    participants:[],
    meetingRooms:[],
    availableMeetingRooms:[],
    nowMeetingRooms:[],
    isAdmin:'',
    profile:{

    }
  },
  mutations: {
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    changeUserGroup (state, payload){
      state.userGroup = payload.userGroup
    },
    changeParticipants(state,payload){
      state.participants = payload
    },
    changeMeetingRooms(state,payload){
      state.meetingRooms = payload
    },
    changeAvailableMeetingRooms(state,payload){
      state.availableMeetingRooms = payload
    },
    changeNowMeetingRooms(state,payload){
      state.nowMeetingRooms = payload.rooms
      state.nowMeetingRooms.sort((a,b)=>{
        return window.parseInt(a.floor) - window.parseInt(b.floor)
      })
      let formEquipment = payload.form.equipment
      let formState = payload.form.state
      let formCapacity = payload.form.capacity
      for( let i = 0;i<payload.rooms.length;i++){
        if (payload.rooms[i].state != formState || payload.rooms[i].capacity < formCapacity) {
          state.nowMeetingRooms.splice (i, 1)
          i--
          continue;
        }
        let equ = payload.rooms[i].equipment.split(",")
        for (let j = 0 ;j<formEquipment.length ;j++){
          if(!equ.includes(formEquipment[j])){
            state.nowMeetingRooms.splice (i, 1)
            i--
            break;
          }
        }
      }
      if (payload.rooms.length > 0) {
        if (payload.rooms[0].state != formState || payload.rooms[0].capacity < formCapacity) {
          state.nowMeetingRooms.splice (0, 1)
        }
        let equ = payload.rooms[0].equipment.split (",")
        for (let j = 0; j < formEquipment.length; j++) {
          if (!equ.includes (formEquipment[j])) {
            state.nowMeetingRooms.splice (0, 1)
            break;
          }
        }
      }
    },
    deleteNowMeetingRooms(state,payload){
      for (let i = 0;i<state.nowMeetingRooms.length ; i++){
        if (payload === state.nowMeetingRooms[i].mrid){
          state.nowMeetingRooms.splice(i,1)
        }
      }
    },
    changeIsAdmin(state,payload){
      state.isAdmin = payload.isAdmin
    },
    changeProfile(state,payload){
      state.profile = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedState()]
})
