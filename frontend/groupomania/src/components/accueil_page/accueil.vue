<template>
    <div>
        <appHeader></appHeader>
        <h1>fil de discussion  </h1>
        <posted 
            v-for="(post, index) in data" v-bind:key="index"   
            v-bind:post="post.post" 
            v-bind:postId="post.id"
            v-bind:postUserId="post.user_id"
            >
        </posted>
        <createPost></createPost>
    </div>
</template>

<script>
    import Posted from './_posted.vue'
    import CreatePost from './_createPost.vue'
    import Header from '../header/header.vue'
    import axios from 'axios'

    export default {
        name: 'Accueil',
        data(){
            return {
                data: null,
                postId: null,
                postUserId: null
            }
        }, 
        mounted() {
            // Requête getAllPost :
            const token = localStorage.getItem('token');
            axios 
            .get('http://localhost:3000/api/posts', {
                headers: {
                    Authorization: 'Bearer '+ token
                }
            })
            .then(res => {
                this.data = res.data;
            });
        },
        components: {
            'posted': Posted,
            'createPost': CreatePost,
            'appHeader': Header,
        },

    }
</script>

<style lang="scss">
    .container{
        width: 97%;
        margin: auto;
    }
    .divPost{
        background-color: rgb(226, 226, 226);
        padding: 5px;
        margin: 5px 5px 20px 5px;
        border-radius: 5px;
    }
    .postUserInfo{
        width: 100%;
        text-align: left;
        margin : 5px;
        font-size: 0.8em;
    }
    .post{
        margin: 5px;
    }



</style>