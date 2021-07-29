<template>
    <div class="container">
        <p class="postUserInfo">{{ firstname }} {{ lastname }} postId : {{ postId }} / postUserId : {{ postUserId }}</p>
        <div class="divPost"> 
            <p class="post">{{ post }}</p>
            <button>Répondre</button>
            <button>Voir toutes les réponses</button>
            <!-- v-if userId = postUserId :         -->
            <button>Modifier</button> 
            <button v-on:click.prevent="deletePostFct">Supprimer</button>
        </div>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {

        name: 'Posted',
        data(){
            return {
                firstname: 'Nom',
                lastname: 'Prénom',
            }
        }, 
        props: ['post', 'postId', 'postUserId'],
        mounted() {
            // Requête getUser :
            const token = localStorage.getItem('token');
            axios 
            .get(`http://localhost:3000/api/users/${this.postUserId}`, {
                headers: {
                    Authorization: 'Bearer '+ token
                }
            })
            .then(res => {
                console.log('resGetUser :', res.data);
                this.firstname = res.data[0].firstname;
                this.lastname = res.data[0].lastname;
            });
        },
        methods: {
            deletePostFct: function() {
                console.log(this.postId);
                const token = localStorage.getItem('token');
                axios
                .delete(`http://localhost:3000/api/posts/${this.postId}`, {
                    headers: {
                        Authorization: 'Bearer '+ token
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Message supprimé !");
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
</style>