<template>
    <div> 

        <div class="postUserInfo"> <!--infos sur le User qui a écrit ce commentaire-->
            {{ firstname }} {{ lastname }}
        </div>
        <div class="sended-comment">
            <div>
                {{ comment }}
            </div>
            <div>
                <button 
                v-on:click.prevent="toggleModify = true" 
                v-if="userId === commentUserId">
                    Modifier commentaire
                </button>
                <button 
                v-on:click.prevent="deleteCommentFct" 
                v-if="userId === commentUserId || (admin === 1)">
                    Supprimer commentaire
                </button>
            </div>
        </div>

        <div class="modify-comment" v-if="toggleModify">
            <form action="">
                <p>
                    <textarea 
                    v-model="comment" name="createpost" placeholder="modifie ton commentaire ici !">
                    </textarea>
                </p>
                <button v-on:click.prevent="modifyCommentFct" type="submit">
                    Renvoyer mon commentaire
                </button>
            </form>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Comments',
    data() {
        return{
            toggleModify: false,
            userId: '',
            admin: '',
            // info du user qui a commenté :
            firstname: "",
            lastname: "",
            // picture: "",
        }
    },
    props: ['commentId', 'comment', 'commentUserId'],
    mounted(){
            // Requête getUser : pour connaitre les infos du user qui a écrit le commentaire
            console.log('commentUserId :', this.commentUserId);
            axios 
            .get(`http://localhost:3000/api/users/${this.commentUserId}`, {
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res.data[0]);
                if (res.data[0]){
                    this.firstname = res.data[0].firstname;
                    this.lastname = res.data[0].lastname;
                    // this.picture = res.data[0].picture
                } else {
                    this.firstname = 'Utilisateur inconnu';
                }
            })
            .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
            });
            // Requête getUserId :
            axios 
            .post('http://localhost:3000/api/users/userId', {
                token: localStorage.getItem('token')
            })
            .then(ResGetUserId => {
                this.userId = ResGetUserId.data.userId;
                this.admin = ResGetUserId.data.admin;
                console.log('userId :', this.userId);
                console.log('admin :', this.admin);
            })
            .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
            })
    },
    methods: {
            // Requête deleteComment
            deleteCommentFct: function() {
                axios
                .delete(`http://localhost:3000/api/comments/${this.commentId}`, {
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Commentaire supprimé !");
                    document.location.reload();
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
            })
            },
            // Requête modifyComment
            modifyCommentFct: function() {
                axios
                .put(`http://localhost:3000/api/comments/${this.commentId}`, {
                    comment: this.comment,
                    userId: this.userId,
                }, {
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Commentaire modifié !");
                    document.location.reload();
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue ! Etes-vous bien l'auteur de ce message ?");
            })
            },
    }
}

</script>

<style lang="scss" scoped>
    .info-user{
        text-align: left;
    }
</style>