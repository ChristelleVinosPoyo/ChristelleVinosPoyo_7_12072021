<template>
    <div>
        <appHeader></appHeader>

        <h1>Annuaire de tous les utilisateurs</h1>
        <div 
        v-for="(user, index) in data" v-bind:key="index">
            <img class="miniature-annuaire" v-bind:src="user.picture" alt="Photo de profil">
            <div>{{ user.firstname }} {{ user.lastname }} {{ user.email }}</div>
            <!-- div bouton "supprimer le compte" pour admin : -->
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
                accountUserId: '',
            }
        }, 
        mounted() {
            console.log('accountUserId :', this.accountUserId);

            // Requête getAllPost :
            axios 
            .get('http://localhost:3000/api/users', {
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
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

<style lang="scss">
    .miniature-annuaire {
        width: 90px;
        border-radius: 50%;
    }
</style>