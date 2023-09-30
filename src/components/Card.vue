<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';

export default {
    data() {
        return {
            input: ''
        }
    },
    computed: {
        ...mapState(useMainStore, ['surah', 'mark']),
        ...mapWritableState(useMainStore, ['isMark'])
    },
    async created() {
        await this.getMark()
        await this.fetchSurah()
    },
    methods: {
        ...mapActions(useMainStore, ['fetchSurah', 'addMark', 'getMark', 'removeMark']),
        async goDetail(id) {
            this.$router.push(`${id}`)
        }
    }
}
</script>

<template>
    <div v-for="allsurah in surah" :key="allsurah.id" class="card w-48 bg-base-300 shadow-xl hover:scale-105 flex mx-auto">
        <div class="form-control ml-5 mt-5">
            <input @change.prevent="mark === allsurah.id ? removeMark(allsurah.id) : addMark(allsurah.id)"
                :checked="mark === allsurah.id" type="checkbox" :disabled="mark && mark !== allsurah.id"
                class="checkbox checkbox-primary" />
        </div>
        <div class="card-body flex gap-3">
            <h2 class="cart-title">{{ allsurah.id }}</h2>
            <h2 class="card-title">{{ allsurah.name_simple }} ({{ allsurah.verses_count }} Ayat)</h2>
            <h2 class="card-title">{{ allsurah.name_arabic }} ({{ allsurah.translated_name.name }})</h2>
            <br>
            <div class="card-actions justify-end">
                <button @click.prevent="goDetail(allsurah.id)" class="btn btn-primary">Baca</button>
            </div>
        </div>
    </div>
</template>