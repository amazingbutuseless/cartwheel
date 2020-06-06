<template>
    <base-modal>
        <header slot="header">
            <h2>Website Management</h2>
        </header>

        <div
            id="website-manage-modal--main"
            slot="main"
        >
            <ul id="website-registered-items">
                <li
                    v-for="website in websites"
                    :key="website.url"
                >
                    <a
                        href="#"
                        @click="onWebsiteItemClick($event, website)"
                    >
                        {{ website.title }}
                    </a>
                </li>
                <li>
                    <button
                        type="button"
                        @click="addBtnClick"
                    >
                        Add A Website
                    </button>
                </li>
            </ul>

            <website-manage-form
                :mode="websiteManageFormMode"
                :reset="addBtnClick"
            />
        </div>
    </base-modal>
</template>

<script lang="ts">
import Vue from 'vue';

import BaseModal from './BaseModal';
import WebsiteManageForm from './WebsiteManageForm';

export default Vue.extend({
    components: {
        BaseModal,
        WebsiteManageForm
    },

    methods: {
        addBtnClick(e) {
            this.$data.websiteManageFormMode = 'add';
            this.$store.commit('website/setData', {
                'title': '',
                'url': 'https://',
                'remote': '',
            });
        },

        onWebsiteItemClick(e, website) {
            this.$el.querySelectorAll('a').forEach(item => {
                if (e.target == item) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            this.$data.websiteManageFormMode = 'edit';
            this.$store.commit('website/setData', website);
        },
    },

    computed: {
        websites() {
            return this.$store.state.websites.list;
        },
    },

    mounted() {
        const items = this.$el.querySelectorAll('#website-registered-items li');

        if (items.length > 1) items.item(0).querySelector('a').click();
    },

    data() {
        return {
            'websiteManageFormMode': 'add',
        }
    }
})
</script>

<style lang="scss" scoped>
@import '../scss/variables';

@mixin list-item() {
    display: block;
    padding: .8rem;
    padding-left: 2rem;
    font-size: 1.4rem;
    color: map-get($color, background);

    &:before {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 1.6rem;
        transform: trnaslateY(50%);
    }
}

#website-manage-modal--main {
    @media (min-width: map-get($breakpoints, medium)) {
        display: grid;
        grid-template-columns: minmax(20rem, 20vw) 1fr;
        column-gap: 1.6rem;
    }
}

#website-registered-items {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
        border-bottom: 1px solid map-get($color, font);

        &:not(:first-child):last-child {
            position: absolute;
            bottom: 0;
            width: 100%;
        }
    }

    a {
        @include list-item;

        position: relative;
        text-decoration: none;

        &.active:before {
            content: '\1F449';
        }
    }

    button {
        @include list-item;

        width: 100%;
        border: 0;
        background: lighten(map-get($color, font), 5%);
        text-align: left;
        cursor: pointer;

        &:before {
            content: '\26A1';
        }
    }
}
</style>
