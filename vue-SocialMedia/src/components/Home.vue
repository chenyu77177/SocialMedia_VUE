<template>
    <div>
    <h1>貼文</h1>
    <div>
        <div v-for="post in posts" :key="post.id" class="card post_card" >
        <div class="card-body">
            <div class="row">
                <div class="col-10">
                    <h5 class="card-title mb-2">{{post.user.username}}</h5>
                </div>
                <div class="col-2 text-end" v-if="post.user.user_id == userId">
                    <i class="bi bi-pencil-square mx-2 text-secondary" data-bs-toggle="modal" data-bs-target="#updateModal" @click="getPostById(post.post_id)"></i>
                    <i class="bi bi-trash text-danger" data-bs-toggle="modal" data-bs-target="#removeModal" @click="getPostById(post.post_id)"></i>
                </div>
            </div>
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
<!-- Remove Modal -->
<div class="modal fade" id="removeModal" tabindex="-1" aria-labelledby="removeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="removeModalLabel"><i class="bi bi-trash me-2 text-danger"></i>移除貼文</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <p>確認要移除貼文嗎?</p>
          <div class="card p-2">
              <p class="text-secondary text-center m-0">預覽</p>
              <hr class="m-2">
              {{ singlePosts.content }}
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click="removePost(singlePosts.post_id)">移除</button>
      </div>
    </div>
  </div>
</div>
<!-- Update Modal -->
<div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="updateModalLabel"><i class="bi bi-pencil-square me-2"></i>編輯貼文</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <p>發文者：{{singlePosts.user.username}}</p>
          <textarea class="form-control" id="updateContent" cols="" rows="10" v-model="singlePosts.content"></textarea>
          <!-- <input type="text" class="form-control" id="updateContent" v-model="singlePosts.content"> -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-success" @click="updatePost(singlePosts.post_id)">更新</button>
      </div>
    </div>
  </div>
</div>
<!-- Toast -->
<div class="position-fixed top-0 end-0 p-3">
  <div id="msgToast" class="toast text-bg-dark" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
        <i class="bi bi-info-circle me-2"></i>
        <strong class="me-auto">訊息</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
        {{systemMSG}}
    </div>
  </div>
</div>
</template>

<script>
    import axios from 'axios';
    import store from '@/store';
    import { getCurrentInstance } from 'vue';
    import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';

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
                systemMSG:'',
            };
        },
        mounted() {
            this.fetchPosts();
            this.checkLoginState();
            this.getUserId();
        },
        methods: {
            callToast(msg){
                var msgtoast = document.getElementById('msgToast');
                this.systemMSG = msg;
                var toast = new bootstrap.Toast(msgtoast);
                toast.show();
            },
            closeModal(modalId){
                const myModalEl = document.getElementById(modalId);
                const modal = bootstrap.Modal.getInstance(myModalEl);
                modal.hide();
            },
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
            },
            async removePost(postId){
                try {
                    const response = await axios.delete(store.state.domain + '/api/post/remove/' + postId + '?user_id=' + this.userId);
                    if(response.data == 'success'){
                        console.log('貼文移除成功');
                        this.fetchPosts();
                        this.callToast('貼文移除成功');
                        this.closeModal('removeModal');
                    }else{
                        console.log('貼文移除失敗');
                    }
                } catch (error) {
                    console.error('Error remove fail', error);
                }
            },
            async updatePost(postId){
                try {
                    if(this.singlePosts.content.trim().length === 0){
                        console.log('請勿空白');
                        return;
                    }
                    const response = await axios.post(store.state.domain + '/api/post/update/' + postId + '?user_id=' + this.userId,{
                        content: this.singlePosts.content,
                    });
                    if(response.data == 'success'){
                        console.log('貼文更新成功');
                        this.callToast('貼文更新成功');
                        this.closeModal('updateModal');
                        this.fetchPosts();
                    }else{
                        console.log('貼文更新失敗');
                    }
                } catch (error) {
                    console.error('Error update fail', error);
                }
            }
        }
    };
</script>