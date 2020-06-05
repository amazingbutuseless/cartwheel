<template>
<div class="custom-select-wrapper">
    <select
    :name="name"
    @change="onOptionChange"
>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
        {{ option.key }}
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
        },
        onOptionChange: Function,
    },
});
</script>

<style lang="scss" scoped>
    @import '../scss/variables';
    @import '../scss/font';

.custom-select-wrapper {
    position: relative;
    min-width: 20rem;
    border: 1px solid $border-color;
    border-radius: 2px;
    cursor: pointer;
  
    select {
      padding: 1.2rem 1rem;
      width: 100%;
      border: 1px solid transparent;
      background-color: transparent;
      font-size: 1.4rem;
      appearance: none;
      -webkit-appearance: none;
      outline: none;
    }
  
    &:after {
      @include FontAwesomeIcon('\f0d7');

      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      font-size: 1.6rem;
      color: darken($border-color, 25%);
      pointer-events: none;
    }
  }
</style>