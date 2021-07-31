<template>
    <div class="container">
        <p class="postUserInfo">{{ firstname }} {{ lastname }} / postId : {{ postId }} / postUserId : {{ postUserId }}</p>
        <div class="divPost"> 
            <p class="post">{{ post }}</p>
            <button v-on:click="toggleFct();">Répondre</button>
            <button v-on:click="toggleFct();">Voir toutes les réponses</button>
            <button v-if="userId === postUserId">Modifier</button> 
            <button 
            v-on:click.prevent="deletePostFct" 
            v-if="userId === postUserId || (admin !== 0)">
                Supprimer
            </button>
            <!----------------- Début div commentaires ---------------------->
            <div v-if="toggle">Ici les commentaires
                <div  class="comment" v-for="(comment, index) in comments" v-bind:key="index"
                    v-bind:commentId="comment.id"> 
                    {{ comment.comment }} / commentId : {{ commentId }}-{{ comment.id }}
                    <div>
                        <button>Modifier commentaire</button>
                        <button v-on:click.prevent="deleteCommentFct">Supprimer commentaire</button>
                    </div>
                </div>
                <div>
                    <form action="">
                        <p>
                            <textarea 
                            v-model="newComment" name="createpost" placeholder="Ecris ton commentaire ici !">
                            </textarea>
                        </p>
                        <button v-on:click.prevent="createCommentFct" type="submit">
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {

        name: 'Posted',
        data(){
            return {
                firstname: '',
                lastname: '',
                toggle : false,
                comments : '',
                newComment: '',
                commentId: ''
            }
        }, 
        props: ['post', 'postId', 'postUserId', 'admin', 'userId',],
        mounted() {
            // Requête getUser :
            axios 
            .get(`http://localhost:3000/api/users/${this.postUserId}`, {
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
            })
            .then(res => {
                if (res.data[0]){
                    this.firstname = res.data[0].firstname;
                    this.lastname = res.data[0].lastname;
                } else {
                    this.firstname = 'Utilisateur inconnu';
                }
            });
            // Requête getPostComments
            axios
            .get(`http://localhost:3000/api/comments/${this.postId}`, {
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
            })
            .then(res => {
                this.comments = res.data;
            });
        },
        methods: {
            toggleFct: function() {
                if (this.toggle === true){
                    this.toggle = false
                }
                if (this.toggle === false){
                    this.toggle = true
                }
            },
            // Requête deletePost
            deletePostFct: function() {
                axios
                .delete(`http://localhost:3000/api/posts/${this.postId}`, {
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Message supprimé !");
                    document.location.reload();
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
            })
            },
            createCommentFct: function() {
                // Requête createComment :
                console.log(this.newComment, this.userId, this.postId,);
                axios
                .post('http://localhost:3000/api/comments', {
                    comment: this.newComment,
                    user_id: this.userId,
                    post_id: this.postId
                }, {headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log('res createPost :', res);
                    console.log('post :', this.post);
                    alert("commentaire envoyé !");
                    document.location.reload();
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
                })
            },
            deleteCommentFct: function() {
                console.log('commentId depuis deleteCommentFct : ', this.comment.id);
                axios
                .delete(`http://localhost:3000/api/comments/${this.commentId}`, {
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Message supprimé !");
                    document.location.reload();
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
            })
            },
        }

    }
</script>

<style lang="scss">
</style>