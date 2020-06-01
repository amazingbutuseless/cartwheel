<template>
    <div>
        <website-timeline></website-timeline>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WebsiteTimeline from './WebsiteTimeline.vue';

export default Vue.extend({
    name: 'WebsiteContainer',
    components: {
        WebsiteTimeline
    }
});

</script>


import * as React from 'react';

export default () => {
    return (
        <section id="website-container">
            <WebsiteTimeline></WebsiteTimeline>
            <div>???</div>
        </section>
    );
};
