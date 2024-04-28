<template>
    <div>
        
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