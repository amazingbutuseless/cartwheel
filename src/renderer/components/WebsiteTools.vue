<template>
<div id="website-tools">
    <h2>{{ hostname }}</h2>

    <div class="btn-container">
        <website-target-devices :onSelect="onTargetDeviceSelect" />

        <x-button
                type="button"
                className="secondary"
                :onClick="onTakeScreenshotsBtnClick"
        >
            Take Screenshots
        </x-button>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

import XButton from './BaseButton.vue';
import WebsiteTargetDevices from "./WebsiteTargetDevices.vue";

export default Vue.extend({
    components: {
        XButton,
        WebsiteTargetDevices,
    },
    
    methods: {
        onTargetDeviceSelect(device) {
            this.$data.viewportWidth = device.vw;
        },

        onTakeScreenshotsBtnClick(e: Event) {
            e.target.disabled = true;

            const hostname = this.$store.state.website.hostname;
            const currentWebsite = this.$store.state.websites.list.find(website => website.url.includes(hostname));

            this.$store.dispatch('screenshots/take', {
                id: Date.now(),
                url: currentWebsite.url,
                viewportWidth: this.$data.viewportWidth,
                remote: currentWebsite.remote,
            });
        }
    },

    computed: {
        hostname(): string {
            return this.$store.state.website.hostname;
        },
    },

    data() {
        return {
            viewportWidth: 1080,
        }
    }
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

.btn-container {
    text-align: right;
}

#website-tools {
    margin-bottom: 1.6rem;
    padding: 0 2.4rem;
    padding-top: calc(14.8rem + .8rem);
    padding-bottom: 1.6rem;
    border-bottom: 1px solid map-get($color, border);

    @media (min-width: map-get($breakpoints, medium)) {
        display: grid;
        grid-template-columns: 1fr minmax(20rem, 33vw);
        padding-top: calc(10.3rem + .8rem);
    }
}
</style>