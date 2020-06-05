<template>
    <ul>
        <li v-for="group in groups" :key="group.timestamp">
            <a :href="'#' + group.timestamp" @click="onItemClick">{{ convertTimestampToReadableDate(group.timestamp) }}</a>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        methods: {
            onItemClick(e: Event): void {
                e.preventDefault();

                const items = this.$el.querySelectorAll('li');

                items.forEach(item => {
                    if (item.querySelector('a') === e.target) {
                        item.classList.add('active');

                    } else {
                        item.classList.remove('active');
                    }
                });

                this.$store.commit('selectTimestamp', e.target.hash.substr(1));
            },

            convertTimestampToReadableDate(timestamp: string): string {
                return new Date(parseInt(timestamp)).toLocaleString();
            },
        },

        computed: {
            groups() {
                return this.$store.getters.timestampGroup;
            }
        },

        updated() {
            const items = this.$el.querySelectorAll('a');

            if (items.length > 0) items.item(0).click();
        },
    });
</script>

<style lang="sass" scoped>
    @import '../scss/variables';

    $link-color: lighten(map-get($color, border), 20%);
    $hover-color: lighten($link-color, 10%);
    $active-color: map-get($color, primary);

    
    ul {
        list-style: none;
        margin: 1.6rem 0;
        padding: 0;
    }

    li {
        padding: 1rem;
        border-left: 5px solid $link-color;

        &.active {
            a {
                color: $active-color;

                &:before {
                    border-color: $active-color;
                }
            }
        }
    }

    a {
        display: block;
        margin-left: -2.25rem;
        font-size: 1.2rem;
        color: $link-color;
        font-weight: 500;
        text-decoration: none;

        &:before {
            display: inline-block;
            margin-right: .8rem;
            width: 10px;
            height: 10px;
            border: 5px solid $link-color;
            border-radius: 10px;
            background-color: map-get($color, background);
            content: '';
            vertical-align: middle;
        }

        &:hover {
            color: $hover-color;

            &:before {
                border-color: $hover-color;
            }
        }
    }
</style>
