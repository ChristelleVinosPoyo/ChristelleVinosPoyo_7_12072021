<template>
    <div>
        <form class="form" method="POST" action="#">
            
            <div class="form__container1">
                <p class="email">
                    <label for="email">E-mail : </label>
                    <input v-model="formData.email" type="email" name="email" id="email" required>
                </p>
                <p>
                    <label for="password">Mot de passe : </label>
                    <input v-model="formData.password" type="password" name="password" id="password" required>
                </p>
            </div>
                <button v-on:click.prevent="loginFct" type="submit">
                        Je me connecte
                </button>
        </form>

    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: 'Login',
        data(){
            return {
                formData: {
                    email: '',
                    password: '',
                }
            }
        },
        methods: {
            loginFct: function() {
                console.log(this.formData);
                axios
                .post('http://localhost:3000/api/users/login', {
                    email: this.formData.email,
                    password: this.formData.password
                })
                .then(res => {
                    console.log(res.data.token);
                    alert("Vous êtes maintenant connecté !");
                    localStorage.setItem('token', res.data.token);
                    this.$router.push('Accueil');
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
          })
            }
        }
    }

</script>

<style lang="scss">
    .logo {
        width: 250px;
    }
</style>