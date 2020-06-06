<template>
    <div id="website-container">
        <aside>
            <website-timeline />
        </aside>

        <website-details v-if="hasScreenshotGroupSelected"/>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    
    import WebsiteTimeline from './WebsiteTimeline.vue';
    import WebsiteDetails from './WebsiteDetails.vue';

    export default Vue.extend({
        name: 'WebsiteContainer',

        components: {
            WebsiteTimeline,
            WebsiteDetails,
        },

        computed: {
            hasScreenshotGroupSelected() {
                return this.$store.state.screenshots.id.length > 0;
            },
        }
    });
</script>

<style lang="scss" scoped>
@import '../scss/variables';

#website-container {
    padding: 0 2.4rem;
    
    @media (min-width: map-get($breakpoints, medium)) {
        display: grid;
        grid-template-columns: minmax(20rem, 20vw) 1fr;
    }
}
</style>
