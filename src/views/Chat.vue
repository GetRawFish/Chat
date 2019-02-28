<template>
    <div class="chat container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="header">
            <div class="header-contact-bg"></div>
            <div class="header-contact">
                <router-link :to="{ name: 'list'}" class="header-contact-go-back"><i class="fas fa-chevron-left"></i></router-link>
                <div class="header-contact-avatar"></div>
                <div class="header-contact-info">
                    <h2 class="header-contact-name">{{ receptorUsername }}</h2>
                    <p class="header-contact-state"></p>
                </div>
            </div>
        </div>
        <div class="chat-chat" id="chatChat">
            <div v-for="mensaje in mensajes" :key="mensaje.id">
                <p :class="{'chat-received': mensaje.fields.Receptor[0] == $route.params.receptor, 'chat-sent': mensaje.fields.Receptor[0] != $route.params.receptor}">{{ mensaje.fields.Text }}</p>
            </div>
        </div>
        <div class="write">
            <input type="text" v-model="textoNuevoMensaje" @keyup.enter="nuevoMensaje">
            <button @click.prevent="nuevoMensaje" >Enviar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chat',
    props: ['emisor', 'receptor'],
    components: {
    },
    data: function () {
        return {
            loading: true,
            emisorUsername: '',
            receptorUsername: '',
            mensajes: [],
            textoNuevoMensaje: '',
            tiempoRefresco: 1000
        }
    },
    mounted: function () {
        // $route.params.id
        let that = this;
        // Obtenemos el nombre del emisor
        axios.get(`https://api.airtable.com/v0/appCswOBjla31jRfk/User/${that.$route.params.emisor}`)
        .then(function (response) {
            that.emisorUsername = response.data.fields.Username;
            // Con el resultado, obtenemos los mensajes del receptor y emisor
            that.cargarMensajes();
            setInterval(that.cargarMensajes, that.tiempoRefresco);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
        // Obtenemos el nombre del receptor
        axios.get(`https://api.airtable.com/v0/appCswOBjla31jRfk/User/${that.$route.params.receptor}`)
        .then(function (response) {
            that.receptorUsername = response.data.fields.Username;
            // Con el resultado, obtenemos los mensajes del receptor y emisor
            that.cargarMensajes();
            setInterval(that.cargarMensajes, that.tiempoRefresco);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    },
    methods: {
        cargarMensajes: function () {
            let that = this
            axios.get(`https://api.airtable.com/v0/appCswOBjla31jRfk/Message?view=Grid%20view&filterByFormula=OR(AND({Emisor}="${that.emisorUsername}", {Receptor}="${that.receptorUsername}"), AND({Emisor}="${that.receptorUsername}", {Receptor}="${that.emisorUsername}"))`)
                .then(function (response) {
                    if (response.data.records.length != that.mensajes.length) {
                        that.mensajes = response.data.records;
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        nuevoMensaje: function () {
            let that = this
            // Enviamos al API el nuevo mensaje
            axios.post(`https://api.airtable.com/v0/appCswOBjla31jRfk/Message`, {
                "fields": {
                    "Text": that.textoNuevoMensaje,
                    "Emisor": [
                        that.$route.params.emisor
                    ],
                    "Receptor": [
                        that.$route.params.receptor
                    ]
                }
            })
            .then(function (response) {
                that.cargarMensajes();
                that.textoNuevoMensaje = '';
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        // Refrescamos el mensaje

        }
    },
    updated: function () {
        let chatChat = document.querySelector('#chatChat');
        chatChat.scrollTo(0, chatChat.scrollHeight);
    }
}
</script>
<style lang="postcss" scoped>
p {
    margin: 0;
}
    .chat {
        background-color: cadetblue;
        height: 100vh;
    }
    .header {
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 100;
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
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .header-contact-avatar {
        height: 60px;
        width: 60px;
        border-radius: 60px;
        border: 6px solid gray;
        background-color: cadetblue;
    }
    .chat-received {
        color: red;
    }
    .chat-sent {
        color: blue;
    }
    .write {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: coral;
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .chat-chat {
        z-index: 1;
        overflow: auto;
        height: calc(100% - 100px);
    }
</style>
