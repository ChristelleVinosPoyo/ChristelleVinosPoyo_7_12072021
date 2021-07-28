<template>
    <div class="create-post">
        <form action="">
            <p>
                <input type="text" name="Nom" id="createpost" class="input zone-text" placeholder="Ecris ton message ici !">
            </p>
            <button type="submit">
                Envoyer
            </button>
        </form>
        
    </div>
</template>

<script>
    export default {
        name: 'CreatePost'
    }
</script>

<style lang="scss">
    .create-post {
        padding: 10px;
        margin-top: 15px;
        margin-bottom: 15px;
        background-color: #091f43;
        border-radius: 5px;
    }
</style>