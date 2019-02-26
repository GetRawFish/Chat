<template>
    <div class="user container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="user-user">
            <h1 class="user-title">
                Elige tu usuario
            </h1>
            <select class="user-select" v-model="emisorSeleccionado">
                <option value="0" disabled selected>- Elige usuario -</option>
                <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">{{ usuario.fields.Username }}</option>
            </select>
            <div user-enter>
                <router-link v-if="emisorSeleccionado != 0" class="user-enter-enter" :to="{ name: 'list', params: { emisor: emisorSeleccionado }}">
                        Entrar
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'user',
    components: {
    },
    data: function () {
        return {
            usuarios: [],
            loading: true,
            emisorSeleccionado: 0

        }
    },
    mounted: function () {
        let that = this;
        axios.get('https://api.airtable.com/v0/appCswOBjla31jRfk/User?view=Grid%20view')
            .then(function (response) {
                that.usuarios = response.data.records;
                console.log(response);
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
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    .user-user {
        height: 100vh;
        background-image: linear-gradient(darkgreen, darkorchid);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .user-select {
        width: 80%;
        height: 50px;
    }
    input:focus, button:focus, select:focus {
        outline: initial;
    }
    .user-enter {
        height: 50px;
    }
    .user-enter-enter {
        text-decoration: none;
        color: azure;
    }
</style>