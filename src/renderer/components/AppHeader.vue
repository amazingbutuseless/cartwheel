<template>
<header>
    <h1>Cartwheel</h1>

    <website-manager :onManageBtnClick="onManageBtnClick" />

    <website-manage-modal v-if="manageModalShown" />
</header>
</template>


<script lang="ts">
import Vue from 'vue';

import WebsiteManager from './WebsiteManager';
import WebsiteManageModal from './WebsiteManageModal';

export default Vue.extend({
    name: 'AppHeader',

    components: {
        WebsiteManager,
        WebsiteManageModal
    },

    methods: {
        onManageBtnClick(e) {
            this.$store.commit('modal/show');
        },
    },

    computed: {
        manageModalShown() {
            return this.$store.state.modal.visible;
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