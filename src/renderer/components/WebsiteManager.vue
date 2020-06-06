<template>
<div id="website-manager">
    <base-select
        name="website-select"
        :options="registeredWebsites"
        :onOptionChange="onWebsiteSelect"
    >
        <option disabled selected hidden>Choose the website</option>
    </base-select>

    <x-button
        type="button"
        className="secondary"
        :onClick="onManageBtnClick"
    />
</div>
</template>

<script lang="ts">
import Vue from 'vue';

import BaseSelect from './BaseSelect.vue';
import XButton from './BaseButton.vue';

export default Vue.extend({
    props: {
        onManageBtnClick: Function,
    },

    components: {
        BaseSelect,
        XButton,
    },
    
    methods: {
        onWebsiteSelect(e: Event) {
            const parser = document.createElement('a');
            parser.href = e.target.value;

            this.$store.commit('website/setHostname', parser.hostname);
            this.$store.dispatch('screenshots/setGroups');
        },
    },

    computed: {
        registeredWebsites() {
            return this.$store.getters['websites/options'];
        },
    },
});
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/font';

#website-manager {
    display: grid;
    grid-template-columns: 1fr min-content;

    button {
        border: 0;
        align-self: center;

        &:before {
            @include FontAwesomeIcon('\f013');
        }
    }

    .custom-select-wrapper {
        display: inline-block;
        min-width: 20rem;
        align-self: center;
    }
}
</style>
