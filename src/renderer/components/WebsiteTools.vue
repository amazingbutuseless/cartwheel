<template>
<div id="website-tools">
    <h2>{{ selectedWebsite }}</h2>

    <x-button
        type="button"
        className="secondary"
        :onClick="onTakeScreenshotsBtnClick"
    >
        Take Screenshots
    </x-button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

import XButton from './BaseButton.vue';

export default Vue.extend({
    components: {
        XButton,
    },
    
    methods: {
        onTakeScreenshotsBtnClick(e: Event) {
            e.target.disabled = true;

            this.$store.dispatch('takeScreenshots');
        }
    },

    computed: {
        selectedWebsite(): string {
            return this.$store.state.selectedWebsite;
        },
    },
})
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/font';

h2 {
    display: inline-block;
    color: map-get($color, primary);
}

button {
    &:before {
        @include FontAwesomeIcon('\f302');
    }
}

#website-tools {
    margin-bottom: 1.6rem;
    padding: 0 2.4rem;
    padding-top: calc(14.8rem + .8rem);
    padding-bottom: 1.6rem;
    border-bottom: 1px solid map-get($color, border);

    @media (min-width: map-get($breakpoints, medium)) {
        padding-top: calc(10.3rem + .8rem);
    }
}
</style>