<template>
    <div>
        <div class="alert alert-dark alert-dismissible fade show" role="alert" v-if="alertToggleState">
            <span>{{alertMSG}}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="this.alertToggle()"></button>
        </div>
        <div v-if="!isLogin">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <span>登入後即可發布貼文</span>
            </div>
        </div>
        <div class="container" v-if="isLogin">
            <h5>Hi ! {{ username }}</h5>
            <p>請在以下輸入您想發布的內容</p>
            <form @submit.prevent="newPost">
                <div class="row mb-2 p-2">
                    <textarea class="form-control" id="content" v-model="content" rows="7" placeholder="請輸入文字..." required></textarea>
                </div>
                <div class="row p-2">
                    <button class="btn btn-dark d-block" type="submit">新增</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import store from '@/store';
    import axios from 'axios';
    import { getCurrentInstance } from 'vue';

    export default {
        data() {
            return {
                username: '',
                userId: '',
                isLogin: false,
                content: '',
                alertMSG: '',
                alertToggleState: false,
            };
        },
        mounted() {
            this.getUserData();
        },
        methods: {
            async newPost() {
                try {
                    const response = await axios.post(store.state.domain + '/api/post/newPost?user_id=' + this.userId, {
                        content: this.content,
                    });
                    const result = response.data;
                    if(result == 'success'){
                        this.alertMSG = "發布成功";
                        this.alertToggleState = true;
                    }else{
                        this.alertMSG = "發布成功";
                        this.alertToggleState = true;
                    }
                } catch (error) {
                    console.error('Error new post:', error);
                }
            },
            getUserData(){
                const internalInstance = getCurrentInstance();
                const internalData = internalInstance.appContext.config.globalProperties;
                this.username = internalData.$cookies.get('username');
                this.userId = internalData.$cookies.get('uid');
                if(this.userId != null){
                    this.isLogin = true;
                }else{
                    this.isLogin = false;
                }
            },
            alertToggle(){
                this.alertToggleState = !this.alertToggleState;
            },
        }
    };
</script>