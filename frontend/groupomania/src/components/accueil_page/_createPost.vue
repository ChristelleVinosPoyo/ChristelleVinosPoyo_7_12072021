<template>
    <div class="create-post">
        <form action="">
            <p v-for="(error, index) in errors" v-bind:key="index">{{ error }}</p>
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
                    errors: [],
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
                this.errors = [];
                if (!this.post){
                    this.errors.push('Un texte est requis.');
                }
                if ((this.errors.length === 0)){
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

    }
</script>

<style lang="scss">
    .create-post {
        padding: 10px;
        margin-top: 15px;
        margin-bottom: 15px;
        & textarea{
            border: none;
            border-radius: 10px;
            background-color: #d6d6d6;

        }
        & p{
            margin-top: 5px;
            margin-bottom: 5px;
        }
    }
    textarea {
        width: 90%;
        height: 70px;
    }
</style>