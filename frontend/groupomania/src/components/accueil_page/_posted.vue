<template>
    <div class="container">
        <div>
            <div class="postUserInfo">  
                <img class="miniature-post" v-bind:src="picture" alt="Photo de profil">
                {{ firstname }} {{ lastname }} </div>
        </div>
        <div class="divPost"> 
            <p class="post">{{ post }}</p>
            <button v-on:click="toggleFct();">Répondre</button>
            <button v-on:click="toggleFct();">Voir toutes les réponses</button>
            <button 
                v-if="userId === postUserId"
                v-on:click="toggleModifyPost = true">
                Modifier
            </button> 
            <button 
            v-on:click.prevent="deletePostFct" 
            v-if="userId === postUserId || (admin !== 0)">
                Supprimer
            </button>
            
            
            <!----------------- div modifyPost ---------------------->
            <div v-if="toggleModifyPost" >div modifier post !
                <form action="">
                    <p>
                        <textarea v-model="post" name="createpost" placeholder="modifie ton message ici !"></textarea>
                    </p>
                    <button v-on:click.prevent="modifyPostFct" type="submit">
                        Renvoyer mon message
                    </button>
                </form>
            </div>

            <!----------------- div commentaires (boucle for) ---------------------->
            <div v-if="toggle">
                <comments class="comment"
                    v-for="(comment, index) in comments" v-bind:key="index"
                    v-bind:commentId="comment.id"
                    v-bind:comment="comment.comment"
                    v-bind:commentUserId="comment.user_id"
                    > 
                </comments>
                <div class="send-comment">
                    <form action="">
                        <p v-for="(error, index) in errors" v-bind:key="index">{{ error }}</p>
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

    import Comments from './__comments.vue'
    import axios from 'axios'

    export default {

        name: 'Posted',
        data(){
            return {
                errors: [],
                toggle : false,
                toggleModifyPost: false,
                firstname: '',
                lastname: '',
                comments : '',
                commentId: '',
                comment: '',
                commentUserId: '',
                newComment: ''
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
                    this.picture = res.data[0].picture;
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
                this.toggle = !this.toggle
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
                this.errors = [];
                if (!this.newComment){
                    this.errors.push('Une texte est requis.');
                }
                if ((this.errors.length === 0)){
                    // Requête createComment :
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
                        console.log(res.data);
                        alert("commentaire envoyé !");
                        document.location.reload();
                    })
                    .catch(error => {
                    console.log(error);
                    alert("Une erreur est survenue !");
                    })
                }
            },

            // Requête modifyPost
            modifyPostFct: function() {
                axios
                .put(`http://localhost:3000/api/posts/${this.postId}`, {
                    post: this.post,
                    userId: this.userId,
                }, {
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Message modifié !");
                    document.location.reload();
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue ! Etes-vous bien l'auteur de ce message ?");
            })
            },
        },
        components: {
            'comments': Comments,
        },

    }
</script>

<style lang="scss">
    .miniature-post{
        width: 40px;
        margin: 0;
    }
</style>