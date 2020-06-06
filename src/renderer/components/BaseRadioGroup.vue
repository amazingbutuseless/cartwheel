<template>
    <div class="custom-radio-group">
        <label
            v-for="item in items"
            :key="item.vw"
            :class="isActiveItem(item) ? 'active' : ''"
        >
            {{ item.label }}
            <input
                type="radio"
                :name="name"
                :value="item.value"
                @change="onLabelClick"
                :checked="isActiveItem(item)"
                v-model="checkedValue"
            >
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        props: {
            name: String,
            items: {
                type: Array,
            },
            onClick: Function,
        },

        methods: {
            onLabelClick(e) {
                this.$el.querySelectorAll('label').forEach(label => {
                    if (label === e.target.parentNode) {
                        label.classList.add('active');
                    } else {
                        label.classList.remove('active');
                    }
                });

                this.onClick(e);
            },

            isActiveItem(item) {
                return item.hasOwnProperty('default') && item.default;
            },
        },

        data() {
            return {
                checkedValue: '',
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import '../scss/variables';

    label {
        display: block;
        padding: .8rem;
        border: 1px solid map-get($color, border);
        border-right: 0;
        cursor: pointer;

        input[type=radio] {
            display: none;
        }

        &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        &:last-child {
            border-right: 1px solid map-get($color, border);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        &.active {
            background-color: map-get($color, primary);
            color: map-get($color, background);
        }
    }
    .custom-radio-group {
        display: flex;
    }
</style>