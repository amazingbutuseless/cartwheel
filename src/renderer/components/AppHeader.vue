<template>
    <header>
        <h1>Cartwheel</h1>

        <base-select
            name="website-select"
            :options="registeredWebsites"
            :onOptionChange="onWebsiteSelect"
        />
    </header>
</template>


<script lang="ts">
    import Vue from 'vue';

    import BaseSelect from './BaseSelect.vue';

    export default Vue.extend({
        name: 'AppHeader',

        components: {
            BaseSelect,
        },

        methods: {
            onWebsiteSelect(e: Event) {
                this.$store.commit('selectWebsite', e.target.value);
            }
        },

        computed: {
            registeredWebsites() {
                return this.$store.state.availableWebsites;
            },
        },
    });
</script>


<style scoped lang="scss">
    @import '../scss/variables';

    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        padding: .8rem 2.4rem;
        border-bottom: 1px solid map-get($map: $color, $key: border);
        background-color: map-get($color, background);
        box-sizing: border-box;

        @media (min-width: map-get($breakpoints, medium)) {
            display: grid;
            grid-template-columns: 1fr minmax(20rem, 25vw);
        }
    }

    h1 {
        display: inline-block;
        margin: 0;
        padding: 1rem 0;
        font-size: 1.6rem;
        color: map-get($map: $color, $key: primary);
        line-height: 1.2;
        text-align: center;
        white-space: nowrap;
    
        &:after {
            display: block;
            font-size: 4rem;
            content: '\1F938\1F440\1F44C';
        }

        @media (min-width: map-get($breakpoints, medium)) {
            justify-self: start;
        }
    }
</style>