<template>
    <div>
        <form class="form" method="POST" action="#">
            
            <div class="form__container1">
                <p class="email">
                    <label for="email">E-mail : </label>
                    <input type="email" name="email" id="email" required>
                </p>
                <p>
                    <label for="password">Mot de passe : </label>
                    <input type="text" name="password" id="password" required>
                </p>
            </div>
                <button type="submit">
                        Je me connecte
                </button>
        </form>

    </div>
</template>

<script>
    export default {
        name: 'Login',
    }

</script>

<style lang="scss">
    .logo {
        width: 250px;
    }
</style>