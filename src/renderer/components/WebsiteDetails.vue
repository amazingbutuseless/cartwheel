<template>
    <div id="website-details">
        <header>
            <h2>
                {{ selectedWebsite }}
                <small>{{ timeWhenTakingScreenshotBegun }}</small>
            </h2>
        </header>

        <details v-for="page in pages" :key="page.path">
            <summary>{{ page.path }} - {{ page.title }}</summary>

            <img :src="page.thumbnail" alt="">
        </details>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    computed: {
        selectedWebsite(): string {
            return this.$store.state.selectedWebsite;
        },

        timeWhenTakingScreenshotBegun(): string {
            const timestamp: string = this.$store.state.selectedTimestamp;
            this.$data.selectedTimestamp = timestamp;

            return new Date(parseInt(timestamp)).toLocaleString();
        },
    },

    watch: {
        selectedTimestamp(selected) {
            this.setPages();
        }
    },

    methods: {
        setPages() {
            console.log(`find page data under ${ this.$store.state.selectedWebsite }/${ this.$data.selectedTimestamp }`);
            
            this.$data.pages = [
                {
                    title: 'Registration',
                    path: '/user/register',
                    thumbnail: 'file://dfdfa',
                }
            ];
        }
    },

    data() {
        return {
            'selectedTimestamp': '',
            'pages': [],
        }
    }
});
</script>

<style lang="scss" scoped>
    @import '../scss/variables';

    $primary-color: map-get($color, primary);

    h2 {
        margin: 0;
        margin-bottom: 2.4rem;
        padding: 0;
        font-size: 1.6rem;
        color: $primary-color;

        small {
            display: inline-block;
            padding: .4rem .8rem;
            background-color: $primary-color;
            font-size: 1.2rem;
            color: map-get($color, background);
            font-weight: 700;
        }

        &:before {
            content: '\1F3E0';
        }
    }

    summary {
        font-size: 1.4rem;
        font-weight: 500;
    }
</style>
