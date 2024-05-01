<template>
  <div>
    <div class="alert alert-dark alert-dismissible fade show" role="alert" v-if="alertToggleState">
      <span>{{alertMSG}}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="this.alertToggle()"></button>
    </div>
    <div v-if="this.$cookies.isKey('uid') == false">
      <h5>登入</h5>
      <form @submit.prevent="login">
        <label for="phone">電話</label>
        <input type="text" class="form-control" id="phone" v-model="phone" placeholder="電話" required>
        <label for="password">密碼</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="密碼" required>
        <button class="btn btn-dark" type="submit">登入</button>
      </form>
    </div>
    <button class="btn btn-dark" type="submit" v-if="this.$cookies.isKey('uid')" @click="this.logout()" >登出</button>
  </div>
</template>

<script>
import store from '@/store';
import axios from 'axios';

export default {
  data() {
    return {
      phone: '',
      password: '',
      alertMSG: '',
      alertToggleState: false,
      loginState: false
    };
  },
  mounted(){

  },
  methods: {
    async login() {
      try {
        const response = await axios.post(store.state.domain + '/api/user/login', {
          phone: this.phone,
          password: this.password,
        });
        // console.log(response);
        // console.log(response.data.user_id);
        const user_id = response.data.user_id;
        const login_state = response.data.state;
        const username = response.data.username;
        store.commit('setUserId', user_id); // 將 user_id 存儲到 Vuex store 中
        store.commit('setLoginState', login_state); // 將 login_state 存儲到 Vuex store 中
        if(login_state){
          this.$cookies.set("uid", user_id, {expires: "1D"});
          this.$cookies.set("username", username, {expires: "1D"});
          this.alertMSG = "登入成功";
          this.alertToggleState = true;
          console.log('Login successful');
        }else{
          this.alertMSG = "帳號或密碼錯誤";
          this.alertToggleState = true;
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    alertToggle(){
      this.alertToggleState = !this.alertToggleState;
    },
    logout(){
      this.$cookies.remove("uid");
      this.$cookies.remove("username");
      window.location.reload();
    }
  }
};
</script>