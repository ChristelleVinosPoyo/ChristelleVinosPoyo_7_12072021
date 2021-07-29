<template>
    <div>
        <appHeader></appHeader>
        <h1>Mes informations personnelles</h1>
        <h2>userId : {{ userId }}</h2>
        <p>{{ user }}</p>
        <button>Modifier</button>
        <button>Supprimer</button>

    </div>
</template>

<script>
    import Header from '../header/header.vue'
    import axios from 'axios'
    
    export default {
        name: "MyAccount",
        data(){
            return {
                userId: '',
                user: '',
                }
        },
        mounted(){
            // Requête getUserId :
            const token = localStorage.getItem('token');
            console.log('token :', token);
            axios 
            .post('http://localhost:3000/api/users/userId', {
                token: token
            })
            .then(ResGetUserId => {
                this.userId = ResGetUserId.data.userId
                console.log('userId :', this.userId);
            });
            // Requête getUser :
            axios 
            .get(`http://localhost:3000/api/users/${this.userId}`, {
                headers: {
                    Authorization: 'Bearer '+ token
                }
            })
            .then(res => {
                console.log('resGetUser :', res.data);
                this.user = res.data; // pb res : données de tous les users !!!
            });
        },
        components: {
            'appHeader': Header,
        },

    }
</script>