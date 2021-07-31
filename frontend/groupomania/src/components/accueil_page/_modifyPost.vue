<template>
    <div>
        <form action="">
            <p>
                <textarea v-model="post" name="createpost" placeholder="Ecris ton message ici !"></textarea>
            </p>
            <button v-on:click.prevent="createPostFct" type="submit">
                Envoyer
            </button>
        </form>
    </div>
</template>