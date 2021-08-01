<template>
    <div>
        <appHeader></appHeader>
        <h1>Mes informations personnelles</h1>
        <h2>userId : {{ userId }}</h2>
        <section class="myInfos">
            <div  class="myInfos__divImg">
                <img v-bind:src="user[0].picture" alt="Photo de profil">
            </div>
            <div class="myInfos__contenu">
                <p>Nom : {{ firstname }}</p>
                <p>Prénom : {{ lastname }}</p>
                <p>Age : {{ age }}</p>
                <p>Email : {{ email }}</p>
                <button v-on:click.prevent="toggle = true">Modifier</button>
                <button v-on:click.prevent="deleteUserFct">Supprimer</button>
            </div>
            <div v-if="toggle">
        <form class="form" method="POST" action="#" enctype="multipart/form-data">
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
                <button v-on:click.prevent="modifyUserFct" type="submit">
                Je modifie mon compte
                </button>
        </form>
            </div>
        </section>
        <appFooter></appFooter>
    </div>
</template>

<script>
    import Header from '../header/header.vue'
    import Footer from '../header/footer.vue'
    import axios from 'axios'
    
    export default {
        name: "MyAccount",
        data(){
            return {
                toggle: false,
                // infos utilisateurs :
                userId: null,
                user: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                age: '',
                // infos utilisateurs modifiées :
                // newFirstname: '',
                // newLastname: '',
                // Email: '',
                // newEmail: '',
                // newPassword: '',
                // newAge: '',
                // newPicture: null
                }
        },
        mounted(){
            // Requête getUserId :
            axios 
            .post('http://localhost:3000/api/users/userId', {
                token: localStorage.getItem('token')
            })
            .then(ResGetUserId => {
                this.userId = ResGetUserId.data.userId;
                console.log('userId de getUserId :', this.userId);

                // Requête getUser :
                axios 
                .get(`http://localhost:3000/api/users/${this.userId}`, {
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
                })
                .then(res => {
                    console.log('resGetUser :', res.data[0]);
                    this.user = res.data; 
                    this.firstname = res.data[0].firstname;
                    this.lastname = res.data[0].lastname;
                    this.age = res.data[0].age;
                    this.email = res.data[0].email;
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
                })
            });
        },
        methods: {
            deleteUserFct: function() {
                console.log('userId depuis deleteUserFct : ',this.userId);
                console.log(localStorage.getItem('token'));
                // Requête deleteUser :
                axios
                .delete(`http://localhost:3000/api/users/${this.userId}`, {
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Le compte a été supprimé !");
                    this.$router.push('/');
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
                })
            },
            fileUploadFct: function() {
                this.file = this.$refs.file.files[0];
                console.log('file :',this.file);
            },
            modifyUserFct: function() {
                console.log('userId de modifyUserFct :', this.userId);
                const body = new FormData();
                body.append("userId", this.userId);
                body.append("firstname", this.firstname);
                body.append("lastname", this.lastname);
                body.append("email", this.email);
                body.append("password", this.password);
                body.append("age", this.age);
                body.append("image", this.file);
                console.log(body);
                axios
                .put(`http://localhost:3000/api/users/${this.userId}`, body, {
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("Votre compte a été modifié succès ! Vous pouvez maintenant vous connecter.");
                    document.location.reload();
                })
                .catch(error => {
                console.log(error);
                alert("Une erreur est survenue !");
                })
            }
        },
        components: {
            'appHeader': Header,
            'appFooter': Footer,
        },

    }
</script>

<style lang="scss">

    .myInfos{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .myInfos__divImage{
        display: flex;
        justify-content: center;
        width: 300px;

    }
    img{
        width: 300px;
        border-radius: 20px;
        margin: 20px;
    }
    .myInfos__contenu{
        width: 220px;
        margin: auto;
    }

</style>