<template>
    <div>
        <form class="form" method="POST" action="#">
            <p>
                <label for="name">Nom : </label>
                <input type="text" pattern="[a-zA-Z]{1,30}" name="Nom" id="name" class="input" required>
            </p>
            <p>
                <label for="prenom">Prénom : </label>
                <input type="text" name="Prenom" id="prenom" class="input" required>

            </p>
            <p class="email">
                <label for="email">E-mail : </label>
                <input type="email" name="email" id="email" required>
            </p>
            <p>
                <label for="password">Mot de passe : </label>
                <input type="text" name="password" id="password" required>
            </p>
            <p>
                <label for="age">Age : </label>
                <input type="number" name="age" id="age">
            <p>
                <label for="picture">Photo de profil : </label>
                <input type="text" name="picture" id="picture">
            </p>
                <button type="submit">
                Je crée mon compte
                </button>
        </form>
    </div>
</template>

<script>

    export default {
        name: 'Signup',
    }

</script>

<style lang="scss">
    .logo {
        width: 250px;
    }
</style>