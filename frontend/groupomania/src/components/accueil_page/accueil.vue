<template>
    <div>
        <appHeader></appHeader>
        <h1>Fil de discussion  </h1>
        <createPost></createPost>
        <div class="postContainer">
            <posted 
                v-for="(post, index) in data" v-bind:key="index"   
                v-bind:post="post.post" 
                v-bind:postId="post.id"
                v-bind:postUserId="post.user_id"
                v-bind:admin="admin"
                v-bind:userId="userId"
                >
            </posted>
        </div>
        <appFooter></appFooter>
    </div>
</template>

<script>
    import Posted from './_posted.vue'
    import CreatePost from './_createPost.vue'
    import Header from '../header/header.vue'
    import Footer from '../header/footer.vue'
    import axios from 'axios'

    export default {
        name: 'Accueil',
        data(){
            return {
                data: null,
                postId: null,
                postUserId: null,
                userId : null,
                admin : 0,
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
            // Requête getUserId :
            axios 
            .post('http://localhost:3000/api/users/userId', {
                token: localStorage.getItem('token')
            })
            .then(ResGetUserId => {
                this.userId = ResGetUserId.data.userId;
                this.admin = ResGetUserId.data.admin;
            })
            .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
            })
        },
        components: {
            'posted': Posted,
            'createPost': CreatePost,
            'appHeader': Header,
            'appFooter': Footer
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
    .comment{
        background-color: white;
        border-radius: 10px;
        box-shadow: 5px 5px 10px 0px rgba(77, 77, 77, 0.5);
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .logo-left{
        height: 50px;
        margin: 0;
    }
    .send-comment{
        & p{
            margin-bottom: 5px;
        }
        & textarea{
            border: none;
            border-radius: 10px;
        }
    }
    .sended-comment{
        & div{
            padding-bottom: 5px;
        }
    }
    .modify-comment{
        & p{
            margin-top: 5px;
            margin-bottom: 0;
        }
        & button{
            margin-bottom: 10px;
        }
        & textarea{
            border: #b4b4b4 1px solid;
            border-radius: 10px;
        }
    }



</style>