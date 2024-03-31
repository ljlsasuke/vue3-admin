<template>
    <svg :style="{ width, height }">
        <use :xlink:href="`#icon-${name}`" :fill="color"></use>
    </svg>
</template>

<script lang="ts" setup>
defineProps({
    name: String,
    color: String,
    width: {
        type: String,
        default: "16px",
    },
    height: {
        type: String,
        default: "16px",
    },
});
</script>

<style lang="scss" scoped></style>
