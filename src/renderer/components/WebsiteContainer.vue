<template>
    <div id="website-container">
        <aside>
            <x-button
                type="button"
                className="primary"
                :onClick="onTakeScreenshotsBtnClick"
            >
                📸 Take Screenshots
            </x-button>

            <website-timeline />
        </aside>

        <website-details />
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import XButton from './BaseButton.vue';
    import WebsiteTimeline from './WebsiteTimeline.vue';
    import WebsiteDetails from './WebsiteDetails.vue';

    export default Vue.extend({
        name: 'WebsiteContainer',

        components: {
            XButton,
            WebsiteTimeline,
            WebsiteDetails,
        },

        methods: {
            onTakeScreenshotsBtnClick(e: Event) {
                e.target.disabled = true;

                this.$store.dispatch('takeScreenshots');
            }
        },
    });
</script>

<style lang="scss" scoped>
    @import '../scss/variables';

    #website-container {
        padding: 0 2.4rem;
        padding-top: calc(14.8rem + 1.6rem);

        @media (min-width: map-get($breakpoints, medium)) {
            display: grid;
            grid-template-columns: minmax(20rem, 20vw) 1fr;
            padding-top: calc(10.3rem + 1.6rem);
        }
    }
</style>
