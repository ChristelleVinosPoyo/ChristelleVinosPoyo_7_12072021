<template>
    <div>
        <form class="form" method="POST" action="#" enctype="multipart/form-data">
            <p v-for="(error, index) in errors" v-bind:key="index">{{ error }}</p>
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
                <label for="image">Photo de profil : </label>
                <input v-on:change="fileUploadFct" type="file" name="image" id="image" class="form-control-file" accept= "image/*" ref="file" >
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
                    errors: [],
                // infos user
                    firstname: null,
                    lastname: null,
                    email: null,
                    password: null,
                    age: null,
                    picture: null
            }
        },
        methods: {
            fileUploadFct: function() {
                this.file = this.$refs.file.files[0];
            },
            signUpFct: function() {
                this.errors = [];
                if (!this.firstname){
                    this.errors.push('Le champ Nom est requis.');
                }
                if (!this.lastname){
                    this.errors.push('Le champ Prénom est requis.');
                }
                if (!this.email){
                    this.errors.push('Le champ Email est requis.');
                }
                if (!this.age){
                    this.errors.push('Le champ Age est requis.');
                }
                if (!this.password){
                    this.errors.push('Le champ Mot de passe est requis.');
                }
                if (!this.file){
                    this.errors.push('Une image est requise.');
                }
                if ((this.errors.length === 0)){
                    const body = new FormData();
                    body.append("firstname", this.firstname);
                    body.append("lastname", this.lastname);
                    body.append("email", this.email);
                    body.append("password", this.password);
                    body.append("age", this.age);
                    body.append("image", this.file);
                    axios
                    .post('http://localhost:3000/api/users/signup', body)
                    .then(res => {
                        console.log(res);
                        alert("Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.");
                        document.location.reload();
                    })
                    .catch(error => {
                    console.log(error);
                    alert("Une erreur est survenue !");
                    })       
                }
            }
        }
    }

</script>

<style lang="scss">
    .logo {
        width: 250px;
    }
</style>