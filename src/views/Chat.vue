<template>
    <div class="chat-chat container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="header">
            <div class="header-contact-bg"></div>
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
    props: ['emisor', 'receptor'],
    components: {
    },
    mounted: function () {
        // $route.params.id


        let that = this;
        // Obtenemos los usuarios
        axios.get('https://api.airtable.com/v0/appCswOBjla31jRfk/Message?view=Grid%20view')
            .then(function (response) {
                console.log(response.data.records);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

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
    .header-contact-bg {
        width: 100%;
        height: 35px;
        background-color: white;
        position: relative;
    }
    .header-contact {
        position: absolute; 
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header-contact-avatar {
        height: 60px;
        width: 60px;
        border-radius: 60px;
        border: 6px solid gray;
        background-color: cadetblue;
    }
</style>
