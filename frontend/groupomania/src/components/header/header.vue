<template>
    <div class="navBar">
        <nav>
            <!-- <img class="logo-left" src="../../assets/logo-left-red.png" alt="logo"> -->
            <router-link to="/accueil">
                Accueil
            </router-link> |
            <router-link to="/myaccount">
                Mon Compte
            </router-link> |
            <router-link to="/getallusers">
                Annuaire
            </router-link> |
            <router-link to="/">
                Se déconnecter
            </router-link> |
        </nav>
    </div>
</template>

<script>

    export default {
        name : "Header",
    }

</script>

<style >

</style>