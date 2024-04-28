<template>
    <div>
    <h1>貼文</h1>
    <div>
        <div v-for="post in posts" :key="post.id" class="card" >
        <div class="card-body">
            <h5 class="card-title mb-2">user</h5>
            <p class="card-text">{{ post.content }}</p>
            <p class="comment_count">共 {{ post.comments.length }} 則回覆</p>
            <hr>
            <ul class="list-group list-group-flush" v-for="comment in post.comments" :key="comment.id">
                <li class="list-group-item bg-light">xxx：{{ comment.content }}</li>
            </ul>
            <div class="row mt-3">
                <div class="col-10">
                    <input type="text" class="form-control">
                </div>
                <div class="col-2">
                    <a href="#" class="btn btn-dark d-block">留言</a>
                </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
    data() {
        return {
            posts: []
        };
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
        try {
            const response = await axios.get('http://localhost:8080/api/posts');
            this.posts = response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        }
    }
    };
</script>