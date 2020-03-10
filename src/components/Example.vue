<template>
    <section id="promo" style="text-align:center;">
        <div class="container">
            <p>Webpack say: {{message}}</p>
            <img src="/assets/img/6.jpg" alt="">
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                message: null
            }
        },
        created() {
            this.message = this.$store.getters.getMessage
        }
    }
</script>

<style lang="scss" scoped>
    p {
        color: green;
    }
</style>