<template>
    <div>
        <form class="form" method="POST" action="#">
            <p>
                <label for="name">Nom : </label>
                <input v-model="firstname" type="text" name="Nom" id="name" class="input" required>
            </p>
            <p>
                <label for="prenom">Prénom : </label>
                <input v-model="lastname" type="text" name="Prenom" id="prenom" class="input" required>

            </p>
            <p class="email">
                <label for="email">E-mail : </label>
                <input v-model="email" type="email" name="email" id="email" required>
            </p>
            <p>
                <label for="password">Mot de passe : </label>
                <input v-model="password" type="password" name="password" id="password" required>
            </p>
            <p>
                <label for="age">Age : </label>
                <input v-model.number="age" type="number" name="age" id="age">
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
import axios from 'axios';

    export default {
        name: 'Signup',
        data(){
            return {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                age: '',
                image: null
            }
        },
        methods: {
            // fileUploadFct: function() {
            //     this.image = this.$refs.image.files[0];
            //     console.log(this.image);
            // },
            signUpFct: function() {
                const body = new FormData();
                body.append("image", document.getElementById('picture').files[0]);
                body.append("firstname", this.firstname);
                body.append("lastname", this.lastname);
                body.append("email", this.email);
                body.append("password", this.password);
                body.append("age", this.age);
                // for (let value of body.values()) {
                //     console.log(value);
                // };
                console.log(body);
                axios
                .post('http://localhost:3000/api/users/signup', body, {
                    headers: {'Content-Type': 'multipart/form-data' }
                })
                .then(res => {
                    console.log(res);
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