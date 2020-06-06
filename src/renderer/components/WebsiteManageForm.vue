<template>
<form
    method="post"
    action=""
    @submit="onWebsiteManageFormSubmit"
>
    <input
        type="text"
        name="title"
        :value="title"
        placeholder="Website Title"
    >
    <input
        type="text"
        name="url"
        :value="url"
        placeholder="URL"
        :readonly="mode === 'edit'"
    >
    <input
        type="text"
        name="remote"
        :value="remote"
        placeholder="URL you want to compare"
    >

    <div class="btn-container">
        <x-button
            v-if="mode === 'edit'"
            type="button"
            className="danger"
            :onClick="onDeleteBtnClick"
        >
            Delete
        </x-button>
        <x-button
            type="submit"
            className="primary"
            :onClick="onUpdateBtnClick"
        >
            {{ mode === 'add' ? 'Add' : 'Update' }}
        </x-button>
    </div>
</form>
</template>

<script lang="ts">
import Vue from 'vue';

import XButton from './BaseButton.vue';
import { WebsiteMetadata } from '../store/website';

export default Vue.extend({
    props: {
        mode: String,
        reset: Function,
    },

    components: {
        XButton,
    },

    methods: {
        onWebsiteManageFormSubmit(e: Event) {
            e.preventDefault();

            const validate = ({ title, url }: WebsiteMetadata): boolean => {
                return title.length > 0 && url.length > 0 && /https?:\/\//.test(url);
            }

            const form = e.target;
            const website = {
                title: form.querySelector('[name="title"]').value.trim(),
                url: form.querySelector('[name="url"]').value.trim(),
                remote: form.querySelector('[name="remote"]').value.trim(),
            };

            if (!validate(website)) return alert('Please check the website information again.');

            const action = this.mode === 'add' ? 'website/add' : 'website/update';
            this.$store.dispatch(action, website);

            this.reset();
        },

        onUpdateBtnClick(e) {
        },

        onDeleteBtnClick(e) {
            const website = this.$store.state.website.data;
            this.$store.dispatch('website/remove', website);

            this.reset();
        },
    },

    computed: {
        title() {
            return this.$store.state.website.data.title;
        },

        url() {
            return this.$store.state.website.data.url;
        },

        remote() {
            return this.$store.state.website.data.remote;
        },
    }
})
</script>

<style lang="scss" scoped>
@import '../scss/variables';

input[type=text] {
    display: block;
    margin-bottom: .8rem;
    padding: .8rem;
    width: 100%;
    border: 1px solid map-get($color, font);
    border-radius: 2px;
    box-sizing: border-box;
}

.btn-container {
    text-align: right;

    button {
        margin-left: .8rem;
    }
}
</style>