<template>
    <div>
        <appHeader></appHeader>
        <h1>Annuaire de tous les utilisateurs</h1>
        <div v-for="(user, index) in data" v-bind:key="index">
            {{ user.firstname }} {{ user.lastname }} {{ user.email }}
        </div>
    </div>
</template>

<script>
    import Header from '../header/header.vue'
    import axios from 'axios'
    
    export default {
        name: "GetAllUsers",
        data(){
            return {
                data: null,
            }
        }, 
        mounted() {
            // Requête getAllPost :
            const token = localStorage.getItem('token');
            axios 
            .get('http://localhost:3000/api/users', {
                headers: {
                    Authorization: 'Bearer '+ token
                }
            })
            .then(res => {
                console.log(res.data);
                this.data = res.data;
            });
        },
        components: {
            'appHeader': Header,
        },
    }

</script>