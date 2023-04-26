<template>
    <div class="overlay" @click="cancelAction">
        <div class="modal" @click.stop>
            <p class="modal__title">{{ title }}</p>
            <div class="modal__group">
                <button class="button button--danger" @click="cancelAction">Annuler</button>
                <button class="button button--success" @click="confirmAction">Confirmer</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalConfirmation',
        emits: ['confirm', 'cancel'],
        props: {
            title: {
                type: String,
                required: true
            }
        },
        methods: {
            confirmAction(){
                this.$emit('confirm');
            },
            cancelAction(){
                this.$emit('cancel');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>