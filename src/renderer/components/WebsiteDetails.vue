<template>
    <div id="website-details">
        <header>
            <h3>{{ whenScreenshotTaken }}</h3>
            
            <x-button
                type="button"
                className="secondary"
                :onClick="onScreenshotGroupDeleteBtnClick"
            />
        </header>

        <details
            v-for="page in pages"
            :key="page.path"
        >
            <summary>{{ page.path }} - {{ page.title }}</summary>

            <img :src="'file://' + page.screenshot" alt="">
        </details>
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
        onScreenshotGroupDeleteBtnClick(e: Event) {
            this.$store.dispatch('screenshots/deleteGroup');
        },
    },

    computed: {
        whenScreenshotTaken() {
            const timestamp: string = this.$store.state.screenshots.id;

            return new Date(parseInt(timestamp)).toLocaleString();
        },

        pages() {
            console.log(`find page data under ${ this.$store.state.website.hostname }/${ this.$store.state.screenshots.id }`);

            this.$store.dispatch('screenshots/setPages');
            return this.$store.state.screenshots.pages;
        },
    },
});
</script>

<style lang="scss" scoped>
    @import '../scss/variables';
    @import '../scss/font';

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

    button {
        &:before {
            @include FontAwesomeIcon('\f2ed');
        }
    }

    summary {
        font-size: 1.4rem;
        font-weight: 500;
    }
</style>
