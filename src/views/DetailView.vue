<script>
import CardDetail from '../components/CardDetail.vue';
import FooterComponent from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';

export default {
    components: {
        Navbar,
        FooterComponent,
        CardDetail
    }
}
</script>

<template>
    <Navbar />
    <CardDetail />
    <FooterComponent />
</template>