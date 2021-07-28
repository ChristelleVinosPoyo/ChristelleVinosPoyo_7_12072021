<template>
    <div>
        <h1>fil de discussion</h1>
        <posted    v-bind:data="post.post"
                    v-for="(post, index) in data" v-bind:key="index">
        </posted>
        <createPost></createPost>
    </div>
</template>

<script>
    import Posted from './_posted.vue'
    import CreatePost from './_createPost.vue'
    import axios from 'axios'

    export default {
        name: 'Accueil',
        data(){
            return {
                data: null,
            }
        }, 
        mounted() {
            axios
            .get('http://localhost:3000/api/posts')
            .then(res => {
                console.log(res.data);
                this.data = res.data;
            })
            axios
            .get('http://localhost:3000/api/users/:id', {
                params: {
                    id: 20
                }
            })
            .then(res => {
                console.log('info user :', res.data);
            })
        },
        components: {
            'posted': Posted,
            'createPost': CreatePost
        },

    }
</script>

<style lang="scss">
    .post{
        background-color: rgb(226, 226, 226);
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
    }

</style>