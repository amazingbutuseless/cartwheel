<template>
<div class="modal-mask">
    <div class="modal-container">
        <div class="modal-header">
            <button type="button" @click="onCloseBtnClick">&times;</button>
            <slot name="header"></slot>
        </div>

        <div class="modal-body">
            <slot name="main"></slot>
        </div>

        <div class="modal-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        onCloseBtnClick(e) {
            this.$store.commit('modal/hide');
        }
    }
});
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.modal{
    &-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
    }

    &-container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100%;
        max-width: calc(100vw - 3.2rem);
        border-radius: 4px;
        background-color: #FFF;
        box-sizing: border-box;
        box-shadow: .8rem 1.6rem 1.6rem -.8rem rgba(0,0,0,0.5);
        transform: translate(-50%, -50%);

        @media (min-width: map-get($breakpoints, medium)) {
            max-width: 80vw;
        }
    }

    &-header {
        position: relative;
        margin-bottom: .8rem;
        padding: .8rem 1.6rem;
        padding-bottom: 0;
        border-bottom: 1px solid map-get($color, primary);
        color: map-get($color, primary);

        button {
            position: absolute;
            top: -3.2rem;
            right: 0;
            border: 0;
            background-color: transparent;
            font-size: 2.4rem;
            color: #FFF;
        }
    }

    &-body {
        padding: 0 1.6rem;
        max-height: calc(100vh - 3.2rem);
        overflow: auto;
    }

    &-footer {
        padding: .8rem 1.6rem;
    }
}
</style>
