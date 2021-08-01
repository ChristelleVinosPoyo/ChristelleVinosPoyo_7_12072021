<template>
    <div class="container-connexion">
        <img class="logo" alt="Vue logo" src="../../assets/logo.png">
        <h1>Bienvenue sur votre réseau social</h1>
        <div>
            <button v-on:click="toggleLoginFct">Connexion</button>
            <button v-on:click="toggleSignupFct">S'inscrire</button>
        </div>
        <login v-if="toggleLogin"></login>
        <signup v-if="toggleSignup"></signup>
    </div>
</template>

<script>
    import login from './_login.vue'
    import signup from './_signup.vue'
    
    export default {
        name: 'Connect',
        data(){
            return {
                toggleSignup: false,
                toggleLogin: true
            }
        },
        beforeCreate() {
            localStorage.clear();
        },
        methods: {

            toggleLoginFct : function(){
                this.toggleSignup = false,
                this.toggleLogin = true
            },
            toggleSignupFct : function(){
                this.toggleSignup = true,
                this.toggleLogin = false
            }
        },
        components: {
            'login': login,
            'signup': signup,
        },
    }

</script>

<style lang="scss">
    .logo {
        width: 250px;
        margin: 0;
    }
    .container-connexion{
        padding-bottom: 50px;
        & h1{
            margin-top: 0px;
            margin-bottom: 50px;
        }
    }
</style>