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

@mixin button-face($border-color, $font-color: $border-color) {
    border-color: $border-color;
    color: $font-color;

    &:hover {
        border-color: lighten($border-color, 10%);
        color: lighten($font-color, 10%);
    }
}

button {
    padding: .8rem 1.6rem;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: transparent;

    &:before {
        margin-right: .4rem;
    }

    &.primary {
        @include button-face(map-get($color, primary), #FFF);

        background-color: map-get($color, primary);
    }

    &.secondary {
        @include button-face(map-get($color, border), map-get($color, font));
    }

    &.danger {
        @include button-face(#d92027);
    }
}
</style>
