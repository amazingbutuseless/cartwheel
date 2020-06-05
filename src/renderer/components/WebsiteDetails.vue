<template>
    <div id="website-details">
        <header>
            <h2>
                {{ selectedWebsite }}
                <small>{{ selectedTimestamp }}</small>
            </h2>
        </header>

        <div v-for="page in pages" :key="page.path">
            <h3>{{ page.path }}</h3>

            <img :src="page.thumbnail" alt="">
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    computed: {
        selectedWebsite() {
            return this.$store.state.selectedWebsite;
        },

        selectedTimestamp() {
            const timestamp = this.$store.state.selectedTimestamp;

            return new Date(parseInt(timestamp)).toLocaleString();
        },

        pages() {
            // todo: directory를 watch하면서 정보를 가져오기
            return [
                {
                    path: '/user/register',
                    thumbnail: 'file://dfdfa',
                }
            ]
        },
    },
});
</script>

<style lang="scss" scoped>
    @import '../scss/variables';

    $primary-color: map-get($color, primary);

    h2 {
        margin: 0;
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

    h3 {
        font-size: 1.4rem;
        font-weight: 500;

        &:before {
            display: inline-block;
            content: '\1F4C4';
        }
    }
</style>
