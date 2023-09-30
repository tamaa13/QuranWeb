<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
import { routerKey } from 'vue-router';

export default {
    methods: {
        ...mapActions(useMainStore, ['viewMark', 'removeMark', 'fetchDetail']),
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        },
        goRead(id) {
            this.fetchDetail(id)
            this.$router.push(`${id}`)
        }
    },
    computed: {
        ...mapState(useMainStore, ['infoMark'])
    },
    created() {
        this.viewMark()
    }
}
</script>

<template>
    <div class="navbar bg-base-300">
        <div class="flex-1 animate__animated animate__rotateInUpLeft">
            <a @click.prevent="this.$router.push('/')" class="btn btn-ghost normal-case text-xl">Mengaji</a>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate__animated animate__slideInDown"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                </label>
                <div tabindex="0" class="mt-3 card card-compact dropdown-content w-56 bg-base-100 shadow">
                    <div class="card-body">
                        <div class="">
                            <div class="flex mb-2">
                                <div v-if="infoMark.verses_count" class="flex text-center font-bold text-lg">{{
                                    infoMark.verses_count }} Ayat</div>
                                <br>
                                <span v-if="infoMark.name_simple" class="flex text-center font-bold text-lg">({{
                                    infoMark.name_simple }}) {{ infoMark.name_arabic }}</span>
                                <span v-else class="flex text-center font-bold text-lg">Empty</span>
                            </div>
                            <div class="flex mx-auto gap-2">
                                <button v-if="infoMark.id" @click.prevent="goRead(infoMark.id)"
                                    class="btn btn-primary w-2/4">Go Reading</button>
                                <button v-else disabled class="btn btn-primary w-2/4">Go Reading</button>
                                <button @click.prevent="removeMark(infoMark.id)" class="btn btn-primary w-2/4">Remove
                                    Mark</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown dropdown-end animate__animated animate__slideInDown">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img
                            src="https://e7.pngegg.com/pngimages/416/62/png-clipart-anonymous-person-login-google-account-computer-icons-user-activity-miscellaneous-computer.png" />
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <button @click.prevent="logout()" class="btn btn-primary btn-block">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#D4BF87" fill-opacity="1"
            d="M0,160L48,181.3C96,203,192,245,288,272C384,299,480,309,576,288C672,267,768,213,864,208C960,203,1056,245,1152,224C1248,203,1344,117,1392,74.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
        </path>
    </svg>
</template>