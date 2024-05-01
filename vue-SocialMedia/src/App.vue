<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';

</script>

<script>
  import axios from 'axios';
  import { getCurrentInstance } from 'vue';
  import store from './store';

  export default {
      data() {
          return {
              userId: '',
          };
      },
      mounted() {
          this.getUserData();
          if(this.userId != null){
            this.userIdCheck();
          }
      },
      methods: {
          async userIdCheck() {
              try {
                  const response = await axios.get(store.state.domain + '/api/user/idCheck?user_id=' + this.userId);
                  const result = response.data;
                  if(!result){
                      console.log('移除cookie');
                      this.$cookies.remove('uid');
                      this.$cookies.remove('username');
                  }
              } catch (error) {
                  console.error('Error id check:', error);
              }
          },
          getUserData(){
              const internalInstance = getCurrentInstance();
              const internalData = internalInstance.appContext.config.globalProperties;
              this.userId = internalData.$cookies.get('uid');
          },
      }
  };
</script>

<template>
  <header>
    <div>
      <!-- <HelloWorld msg="Title-------------------" /> -->
      <nav>
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/NewPost">新增貼文</RouterLink>
        <RouterLink to="/login">登入/登出</RouterLink>
        <RouterLink to="/register">註冊</RouterLink>
      </nav>
    </div>
    
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: black;
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  /* display: inline-block; */
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: gray;
  text-decoration: none;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    /* margin-left: -1rem; */
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
