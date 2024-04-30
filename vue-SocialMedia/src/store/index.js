import { createStore } from "vuex";

export default createStore({
    state:{
        domain: "http://localhost:8080",
        count:0,
        userId: null,
        loginState: false
    },
    mutations:{
        increment(state){
            state.count++;
        },
        setUserId(state, user_id){
            state.userId = user_id;
        },
        setLoginState(state, login_state){
            state.loginState = login_state;
        }
    },
    actions:{

    },
    modules:{

    }
})

// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export default new Vuex.Store({
//     state:{
//         user_id: null,
//     },
//     mutations:{
//         setUserId(state, user_id){
//             state.user_id = user_id;
//         },
//     },
// })
