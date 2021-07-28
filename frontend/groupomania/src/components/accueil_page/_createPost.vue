<template>
    <div class="create-post">
        <form action="">
            <p>
                <textarea v-model="formData.post" name="createpost" placeholder="Ecris ton message ici !"></textarea>
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
                formData: {
                    userId: '',
                    post: '',
                }
            }
        },
        methods: {
            createPostFct: function() {
                console.log(this.formData);
                axios
                .post('http://localhost:3000/api/posts', {
                    userId: this.formData.userId,
                    post: this.formData.post
                })
                .then(res => {
                    console.log(res.data.token);
                    alert("Message envoyé !");
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
        background-color: #091f43;
        border-radius: 5px;
    }
    textarea {
        width: 90%;
        height: 70px;
    }
</style>