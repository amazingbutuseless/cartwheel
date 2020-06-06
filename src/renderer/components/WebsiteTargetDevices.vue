<template>
    <base-radio-group
            name="website-target-device"
            :items="devices"
            :onClick="onDeviceSelected"
    />
</template>

<script lang="ts">
    import Vue from 'vue';

    import BaseRadioGroup from "./BaseRadioGroup";

    export default Vue.extend({
        props: {
            onSelect: Function,
        },

        components: {
            BaseRadioGroup,
        },

        methods: {
            onDeviceSelected(e) {
                const targetDevice = this.devices.find(device => device.value === e.target.value);
                this.onSelect(targetDevice);
            }
        },

        data() {
            return {
                'devices': [
                    {
                        'value': 'phone',
                        'vw': 360,
                        'label': 'Phone',
                    },
                    {
                        'value': 'tablet',
                        'vw': 768,
                        'label': 'Tablet',
                    },
                    {
                        'value': 'desktop',
                        'vw': 1280,
                        'label': 'Desktop',
                        'default': true,
                    },
                ]
            }
        }
    })
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/font';

    label:nth-child(1):before {
        @include FontAwesomeIcon('\f10b');
    }

    .custom-radio-group {
        display: inline-flex;
    }
</style>