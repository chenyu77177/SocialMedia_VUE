<template>
    <div>
    <h1>貼文</h1>
    <div>
        <div v-for="post in posts" :key="post.id" class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{ post.user_id }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <input type="text">
            <a href="#" class="btn btn-primary">留言</a>
            <hr>
            <ul v-for="comment in post.comments" :key="comment.id">
                <li>{{ comment.comment_id }} - {{ comment.content }}</li>
            </ul>
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