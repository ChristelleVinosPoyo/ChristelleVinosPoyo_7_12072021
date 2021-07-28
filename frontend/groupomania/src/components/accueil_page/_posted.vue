<template>
    <div>
        <div> 
            <p class="post">{{ data }}</p>
            <button>Répondre</button>
            <button>Voir toutes les réponses</button>
            <!-- v-if userId = postUserId :         -->
            <button>Modifier</button> 
            <button>Supprimer</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Posted',
    props: ['data']
}
</script>