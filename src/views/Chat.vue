<template>
    <div class="chat-chat container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="header">
            <div class="header-contact">
                <router-link :to="{ name: 'list'}" class="header-contact-go-back"><i class="fas fa-chevron-left"></i></router-link>
                <div class="header-contact-avatar"></div>
                <div class="header-contact-info">
                    <h2 class="header-contact-name">Paco</h2>
                    <p class="header-contact-state">Active</p>
                </div>
            </div>
        </div>
        <div class="chat">
            <div class="chat-received">

            </div>
            <div class="chat-sent">

            </div>
        </div>
        <div class="write">

        </div>
    </div>
</template>

<script>
export default {
    name: 'chat',
    components: {
    }
}
</script>
<style lang="postcss" scoped>
    .chat-chat {
        background-color: cadetblue;
        height: 100vh;
    }
    .header {
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header-contact {
        width: 100%;
        height: 40px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .header-contact-avatar {
        background-color: cadetblue;
        height: 60px;
        width: 60px;
        border-radius: 60px;
        border: 5px solid gray;
        position: absolute; 
    }
</style>
