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
            console.log(e.target.value);
        }
    },

    data: () => {
        return {
            'registeredWebsites': [{
                key: '[ORC] local',
                value: 'https://local.oxfordreadingclub.com',
            },
            {
                key: '[ORC] stage',
                value: 'https://stage.oxfordreadingclub.com',
            }],
        }
    }
});
</script>

<style scoped lang="scss">
@import '../scss/global.scss';

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: .8rem 2.4rem;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;

    h1 {
        display: inline-block;
        margin: 0;
        padding: 1rem 0;
        font-size: 1.6rem;
        color: $primary-color;
        line-height: 1.2;
        text-align: center;
        white-space: nowrap;
    
        &:after {
            display: block;
            font-size: 4rem;
            content: '\1F938\1F440\1F44C';
        }
    }

    @media (min-width: 40rem) {
        display: grid;
        grid-template-columns: 1fr minmax(20rem, 25vw);

        h1 {
            justify-self: start;
        }

        .custom-select-wrapper {
            display: inline-block;
            min-width: auto;
            align-self: center;
        }
    }

    @media (min-width: 102.4rem) {

    }
}
</style>