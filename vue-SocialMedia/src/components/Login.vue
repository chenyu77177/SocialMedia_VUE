<template>
  <div>
    <h5>登入</h5>
    <form class="">
      <input type="text" class="form-control" v-model="phone" placeholder="電話">
      <input type="password" class="form-control" v-model="password" placeholder="密碼">
      <button class="btn btn-dark" @click="login">登入</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'password') {
        alert('Login successful!');
      } else {
        alert('Invalid username or password');
      }
    }
  }
};
</script>