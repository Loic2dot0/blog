<template>
    <div class="pagination">
        <button type="button" class="button" @click="showPrevPages" v-if="selectedPages != 0">&lt;</button>
        <button 
            type="button"
            class="button"
            :class="{active: currentPage == pageNumber}"
            v-for="pageNumber in pagesArray[selectedPages]"
            :key="pageNumber"
            @click="changePageNumber(pageNumber)"
        >
            {{ pageNumber }}
        </button>
        <button type="button" class="button" @click="showNextPages" v-if="selectedPages < pagesArray.length - 1">></button>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        emits: ['changePageNumber'],
        props: {
            totalElements: {
                type: Number,
                required: true,
            },
            currentPage: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                selectedPages: 0,
            }
        },
        computed: {
            totalPages(){
                return Math.ceil(this.totalElements / 10);
            },
            pagesArray() {
                const pagesArray = [];
                for (let i = 1; i <= this.totalPages; i += 5) {
                    let array = [];
                    for (let j = i; j < i + 5 && j <= this.totalPages; j++) {
                        array.push(j);
                    }
                    pagesArray.push(array);
                }
                return pagesArray;
            },
        },
        methods: {
            changePageNumber(pageNumber) {
                this.$emit('changePageNumber', pageNumber);
            },
            showPrevPages(){
                if(this.selectedPages == 0) return;
                this.selectedPages--;
            },
            showNextPages(){
                if(this.selectedPages == this.pagesArray.length - 1) return;
                this.selectedPages++;
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>