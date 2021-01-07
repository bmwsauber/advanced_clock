<template>
    <div>
        <div>
            <ul>
                <li v-for="message in messages">
                    {{ message }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        props: [],
        data() {
            return {
                messages: [1,2,3],
            }
        },
        components: {},
        mounted() {

        },
        methods: {
        },
        computed: {},
        watch: {
        }
    }
</script>
<style>
</style>
