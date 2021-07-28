<template>
    <div>
        <form class="form" method="POST" action="#">
            <p>
                <label for="name">Nom : </label>
                <input v-model="formData.firstname" type="text" name="Nom" id="name" class="input" required>
            </p>
            <p>
                <label for="prenom">Prénom : </label>
                <input v-model="formData.lastname" type="text" name="Prenom" id="prenom" class="input" required>

            </p>
            <p class="email">
                <label for="email">E-mail : </label>
                <input v-model="formData.email" type="email" name="email" id="email" required>
            </p>
            <p>
                <label for="password">Mot de passe : </label>
                <input v-model="formData.password" type="password" name="password" id="password" required>
            </p>
            <p>
                <label for="age">Age : </label>
                <input v-model.number="formData.age" type="number" name="age" id="age">
            <p>
                <label for="picture">Photo de profil : </label>
                <input type="file" name="picture" id="picture">
            </p>
                <button v-on:click.prevent="signUpFct" type="submit">
                Je crée mon compte
                </button>
        </form>
    </div>
</template>

<script>
// import axios from 'axios';

    export default {
        name: 'Signup',
        data(){
            return {
                formData: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    age: '',
                    picture: ''
                }
            }
        },
        methods: {
            signUpFct: function() {
                console.log(this.formData);
                // const body = new FormData();
                // axios
                // .post('http://localhost:3000/api/users/signup')
                // .then(res => {
                //     console.log(res.data);
                // })
            }
        }
    }

</script>

<style lang="scss">
    .logo {
        width: 250px;
    }
</style>