<template>
    <div class="list container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="header">
            <h1 class="header-title">Chats activos</h1>
        </div>
        <div class="search">
            <div class="search-field">
                <button class="search-button"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'list',
    components: {
    }
}
</script>
<style lang="postcss" scoped>
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    .header {
        background-color: cadetblue;
        height: 70px;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header-title {
        color: white;
    }
</style>
