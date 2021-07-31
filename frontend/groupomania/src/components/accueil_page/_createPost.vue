<template>
    <div class="create-post">
        <form action="">
            <p>
                <textarea v-model="post" name="createpost" placeholder="Ecris ton message ici !"></textarea>
            </p>
            <button v-on:click.prevent="createPostFct" type="submit">
                Envoyer
            </button>
        </form>
        
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'CreatePost',
        data(){
            return {
                    userId: '',
                    post: '',
                }
        },
        mounted(){
            // Requête getUserId :
            axios 
            .post('http://localhost:3000/api/users/userId', {
                token: localStorage.getItem('token')
            })
            .then(ResGetUserId => {
                this.userId = ResGetUserId.data.userId
                console.log('userId :', this.userId);
            })
            .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
            })
        },
        methods: {
            createPostFct: function() {
                // Requête createPost :
                axios
                .post('http://localhost:3000/api/posts', {
                    userId: this.userId,
                    post: this.post
                }, 
                    {headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                    }}
                )
                .then(res => {
                    console.log('res createPost :', res);
                    console.log('post :', this.post);
                    alert("Message envoyé !");
                    document.location.reload();
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
                })
            }
        }

    }
</script>

<style lang="scss">
    .create-post {
        padding: 10px;
        margin-top: 15px;
        margin-bottom: 15px;
        background-color: #b4b4b4;
        border-radius: 5px;
    }
    textarea {
        width: 90%;
        height: 70px;
    }
</style>