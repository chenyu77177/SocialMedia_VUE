<template>
    <div>
    <h1>貼文</h1>
    <div>
        <div v-for="post in posts" :key="post.id" class="card" >
        <div class="card-body">
            <h5 class="card-title mb-2">{{post.user.username}}</h5>
            <p class="card-text">{{ post.content }}</p>
            <p class="comment_count" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getPostById(post.post_id)"><i class="bi bi-chat-dots"></i> {{ post.comments.length }}</p>
            <hr>
            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getPostById(post.post_id)">查看留言</button>
        </div>
        </div>
    </div>
  </div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">貼文</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="" >
            <div class="">
                <h5 class="card-title mb-2">{{singlePosts.user.username}}</h5>
                <p class="card-text">{{ singlePosts.content }}</p>
                <p class="comment_count">共 {{ singlePosts.comments.length }} 則回覆</p>
                <hr>
                <div class="scoll">
                    <ul class="list-group list-group-flush" v-for="comment in singlePosts.comments" :key="comment.id" data-bs-spy="scroll">
                        <li class="list-group-item bg-light"><span>{{comment.user.username}}</span>：<span>{{ comment.content }}</span></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer d-block">
        <div v-if="!isLogin">
            <p>登入後即可留言</p>
        </div>
        <div class="row mt-3" v-if="isLogin">
            <div class="col-9">
                <input type="text" class="form-control" id="content" v-model="content" required>
            </div>
            <div class="col-3">
                <a href="#" class="btn btn-dark d-block" @click="addComment(singlePosts.post_id)">留言</a>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import axios from 'axios';
    import store from '@/store';
    import { getCurrentInstance } from 'vue';

    export default {
        data() {
            return {
                posts: [],
                singlePosts:{
                    user: {
                        username: '',
                    },
                    content: '',
                    comments: [],
                },
                isLogin: false,
                userId: '',
                content: '',
            };
        },
        mounted() {
            this.fetchPosts();
            this.checkLoginState();
            this.getUserId();
        },
        methods: {
            async fetchPosts() {
                try {
                    const response = await axios.get(store.state.domain + '/api/posts');
                    this.posts = response.data;
                    console.log('取得貼文')
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            },
            async getPostById(postId) {
                try {
                    const response = await axios.get(store.state.domain + '/api/post/get?post_id=' + postId);
                    this.singlePosts = response.data;
                    console.log('取得貼文')
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            },
            checkLoginState(){
                this.isLogin = this.$cookies.isKey("uid");
            },
            getUserId(){
                const internalInstance = getCurrentInstance();
                const internalData = internalInstance.appContext.config.globalProperties;
                this.userId = internalData.$cookies.get('uid');
            },
            async addComment(postId){
                try {
                    const response = await axios.post(store.state.domain + '/api/comment/newComment?user_id=' + this.userId + '&post_id=' + postId,{
                        content: this.content,
                    });
                    if(response.data == 'success'){
                        console.log('已新增留言');
                        this.fetchPosts();
                        this.getPostById(postId);
                        this.content = '';
                    }else{
                        console.log('留言失敗');
                    }
                } catch (error) {
                    console.error('Error add comment:', error);
                }
            }
        }
    };
</script>