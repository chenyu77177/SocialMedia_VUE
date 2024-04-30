<template>
  <div>
    <h5>登入</h5>
    <p>userId:{{ $store.state.userId }}</p>
    <p>userState:{{ $store.state.loginState }}</p>
    <form @submit.prevent="login">
      <input type="text" class="form-control" v-model="phone" placeholder="電話">
      <input type="password" class="form-control" v-model="password" placeholder="密碼">
      <button class="btn btn-dark" type="submit">登入</button>
    </form>
  </div>
</template>

<script>
import store from '@/store';
import axios from 'axios';

export default {
  data() {
    return {
      phone: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/user/login', {
          phone: this.phone,
          password: this.password,
        });
        console.log(response);
        console.log(response.data.user_id);
        const user_id = response.data.user_id;
        const login_state = response.data.login_state;
        store.commit('setUserId', user_id); // 將 user_id 存儲到 Vuex store 中
        store.commit('setLoginState', login_state); // 將 state 存儲到 Vuex store 中
        localStorage.setItem("data", response.data);
        console.log('Login successful');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>