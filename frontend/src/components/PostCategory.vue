<template>
    <div class="category" v-if="categories.length != 0">
        <label for="category">Catégorie : </label>
        <select name="category" id="category" v-model="categorySelected">
            <option value="all">Toutes</option>
            <option v-for="(category, index) in categories" :key="index" :value="category.id_category">
                {{ category.category }}
            </option>
            <option value="null">sans catégorie</option>
        </select>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'PostCategory',
        emit: ['categorySelected'],
        data() {
            return {
                categories: [],
                categorySelected: 'all',
            }
        },
        watch: {
            categorySelected(){
                this.$emit('categorySelected', this.categorySelected)
            }
        },
        methods:{
            getCategories(){
                axios.get(`${import.meta.env.VITE_URL_API}/postcategory`)
                .then(res => {
                    this.categories = res.data
                })
                .catch(error => {
                    console.log(error)
                })
            },
        },
        created() {
            this.getCategories();
        }
    }
</script>

<style lang="scss" scoped>

</style>