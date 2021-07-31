<template>
    <div>modifier post ici !
        <form action="">
            <p>
                <textarea v-model="post" name="createpost" placeholder="modifie ton message ici !"></textarea>
            </p>
            <button v-on:click.prevent="modifyPostFct" type="submit">
                Envoyer
            </button>
        </form>
    </div>
</template>

<script>

    export default {
        name: 'ModifyPost',
        props: ['post', 'postId', 'postUserId', 'admin', 'userId',],
    }

</script>