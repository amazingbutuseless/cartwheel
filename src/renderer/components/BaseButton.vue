<template>
    <button :type="type" :class="className" @click="onClick">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        type: String,
        className: {
            type: String,
            required: false,
        },
        onClick: Function,
    },
});
</script>

<style lang="scss" scoped>
@import '../scss/variables';

button {
    padding: .8rem 1.6rem;
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: transparent;

    &.primary {
        $primary-color: map-get($color, primary);

        border-color: $primary-color;
        color: $primary-color;
        font-weight: 700;

        &:hover {
            $primary-hover-color: lighten($primary-color, 10%);

            border-color: $primary-hover-color;
            color: $primary-hover-color;
        }
    }
}
</style>
