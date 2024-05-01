<template>
    <div class="alert alert-dark alert-dismissible fade show" role="alert" v-if="alertToggleState">
      <span>{{alertMSG}}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="this.alertToggle()"></button>
    </div>
    <div>
        <h5>註冊</h5>
        <form @submit.prevent="login">
            <div class="row mb-3">
                <label for="phone" class="col-form-lable">電話</label>
                <div class="col">
                    <input type="text" class="form-control" id="phone" v-model="phone" placeholder="電話" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="phone" class="col-form-lable">信箱</label>
                <div class="col">
                    <input type="text" class="form-control" v-model="email" placeholder="信箱" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="phone" class="col-form-lable">使用者名稱</label>
                <div class="col">
                    <input type="text" class="form-control" v-model="username" placeholder="使用者名稱" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="phone" class="col-form-lable">密碼</label>
                <div class="col">
                    <input type="password" class="form-control" v-model="password" placeholder="密碼" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="phone" class="col-form-lable">簡介</label>
                <div class="col">
                    <input type="text" class="form-control" v-model="biography" placeholder="簡介" required>
                </div>
            </div>
            <button class="btn btn-dark" type="submit">註冊</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
    data() {
        return {
            phone: '',
            email: '',
            username: '',
            password: '',
            biography: '',
            alertMSG: '',
            alertToggleState: false,
        };
    },
    mounted() {
        
    },
    methods: {
        async login() {
            try {
                const response = await axios.post(this.$store.state.domain + '/api/user/newUser', {
                phone: this.phone,
                password: this.password,
                email: this.email,
                username: this.username,
                biography: this.biography
                });
                // console.log(response);
                const result = response.data;
                if(result != null || result != ""){
                    this.alertMSG = "註冊成功!";
                    this.alertToggleState = true;
                    console.log('register successful');
                }else{
                    this.alertMSG = "註冊失敗";
                    this.alertToggleState = true;
                }
            } catch (error) {
                console.error('Register failed:', error);
            }
        },
        alertToggle(){
            this.alertToggleState = !this.alertToggleState;
        },
    }
    };
</script>