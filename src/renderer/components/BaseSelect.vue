<template>
    <div class="custom-select-wrapper">
        <select
            :name="name"
            @change="onOptionChange"
        >
            <slot></slot>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.name }}
            </option>
        </select>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        props: {
            name: String,
            options: {
                type: Array,
                default: [],
            },
            onOptionChange: Function,
        },
    });
</script>


<style lang="scss" scoped>
    @import '../scss/variables';
    @import '../scss/font';

    select {
        padding: 1.2rem 1rem;
        width: 100%;
        border: 1px solid transparent;
        background-color: transparent;
        font-size: 1.4rem;
        color: map-get($color, font);
        appearance: none;
        -webkit-appearance: none;
        outline: none;
    }

    .custom-select-wrapper {
        position: relative;
        border: 1px solid map-get($map: $color, $key: border);
        border-radius: 2px;
        cursor: pointer;
    
        &:after {
            @include FontAwesomeIcon('\f0d7');

            position: absolute;
            top: 1.2rem;
            right: 1.2rem;
            font-size: 1.6rem;
            color: darken(map-get($map: $color, $key: font), 25%);
            pointer-events: none;
        }

        @media (min-width: map-get($breakpoints, medium)) {
            display: inline-block;
            min-width: 20rem;
            align-self: center;
        }
    }
</style>