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

            <img :src="getImage(page.screenshot)" alt="">
        </details>
    </div>
</template>

<script lang="ts">
    import { nativeImage } from 'electron';
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

        getImage(path) {
            if (!path) return '';

            const image = nativeImage.createFromPath(path);
            return image.toDataURL();
        }
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

    h3 {
        display: inline-block;
        padding: .4rem .8rem;
        background-color: $primary-color;
        font-size: 1.2rem;
        color: map-get($color, background);
        font-weight: 700;
    }

    button {
        &:before {
            @include FontAwesomeIcon('\f2ed');
        }
    }

    details {
        margin-bottom: 1.6rem;

        summary {
            margin-bottom: 1.6rem;
            font-size: 1.4rem;
            font-weight: 500;
        }

        img {
            max-width: 100%;
        }
    }
</style>
