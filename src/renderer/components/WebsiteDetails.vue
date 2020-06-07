<template>
    <div id="website-details">
        <header>
            <h3>{{ whenScreenshotTaken }}</h3>

            <button type="button" :onClick="onScreenshotGroupDeleteBtnClick"></button>
        </header>

        <details
            v-for="page in pages"
            :key="page.path"
        >
            <summary>
                {{ page.path }} - {{ page.title }}
                <span :class="checkIfDifferent(page) ? 'different' : ''"></span>
            </summary>

            <div class="screenshots-container">
                <img :src="getImage(page.screenshot)" alt="">
                <img
                    v-if="page.diffFromPrevious"
                    :src="getImage(page.screenshot.replace($store.state.screenshots.id, `${ $store.state.screenshots.id }/comparison/previous`))"
                    alt=""
                >
                <img
                    v-if="hasRemoteEnv() && page.diffFromRemote"
                    :src="getImage(page.screenshot.replace($store.state.screenshots.id, `${ $store.state.screenshots.id }/comparison/${ getRemoteHostname() }`))"
                    alt=""
                >
            </div>
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
        },

        hasRemoteEnv() {
            return this.currentWebsiteSettings.remote.length > 0;
        },

        getRemoteHostname() {
            const parser = document.createElement('a');
            parser.href = this.currentWebsiteSettings.remote;
            return parser.hostname;
        },

        checkIfDifferent(page) {
            return page.diffFromPrevious || (this.hasRemoteEnv() && page.diffFromRemote);
        },
    },

    computed: {
        whenScreenshotTaken() {
            const timestamp: string = this.$store.state.screenshots.id;

            return new Date(parseInt(timestamp)).toLocaleString();
        },

        currentWebsiteSettings() {
            const hostname = this.$store.state.website.hostname;
            const settings = this.$store.state.websites.list.find(website => website.url.includes(hostname));
            return settings;
        },

        pages() {
            console.log(`find page data under ${ this.$store.state.website.hostname }/${ this.$store.state.screenshots.id }`);

            this.$store.dispatch('screenshots/setPages');

            return this.$store.state.screenshots.pages;
        }
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
        border: 0;
        background-color: transparent;
        cursor: pointer;

        &:before {
            @include FontAwesomeIcon('\f00d');

            color: map-get($color, primary);
        }
    }

    details {
        margin-bottom: 1.6rem;

        summary {
            margin-bottom: 1.6rem;
            font-size: 1.4rem;
            font-weight: 500;
            appearance: none;
            -webkit-appearance: none;
            outline: none;

            span {
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background-color: lime;

                &.different {
                    background-color: red;
                }
            }
        }

        img {
            max-width: 100%;
        }

        .screenshots-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>
