<template>
    <button class="personalizedbutton">{{ content }}</button>
</template>

<script>
export default {
    name: "Buttoncomponent",
    props: {
        content: String,
    }
}
</script>

<style lang="scss">
    .personalizedbutton {
        background-color: #000033;
        padding: 15px;
        border-radius: 7px;
        border: none;
        color: white;
        font-weight: bold;
    }
</style>