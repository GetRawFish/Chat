<template>
    <div class="user container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="home">
            <div class="choose">
                <router-link :to="{ name: 'registro'}"><h1 class="registro activo">
                    Registrarse
                </h1></router-link>
                <Loading v-if="loading" mensaje="Un segundo, por favor"></Loading>
            </div>
            <div class="logearse">
                <p v-if="errorLogin">Los datos introducidos son incorrectos</p>
                <label for="name" class="reg-input">Username</label>
                <input type="text" class="reg-input" name="name" placeholder="username" v-model="username" @keyup.enter="iniciarSesion">
                <label for="password" class="reg-input">Password</label>
                <input type="password" class="reg-input" name="password" placeholder="password" v-model="password" @keyup.enter="iniciarSesion">
                <input type="button" value="Logearse" class="reg-input reg-button" @click.prevent="iniciarSesion">
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'

export default {
    name: 'login',
    components: {
        Loading
    },
    data: function () {
        return {
            usuarios: [],
            loading: false,
            username: '',
            password: '',
            errorLogin: false,
            logingLoading: ''
        }
    },
    mounted: function () {
        this.autoLogin();
    },
    methods: {
        autoLogin: function () {
            let usuario = JSON.parse(localStorage.getItem('usuario'));
            if (usuario != null) {
                this.$router.push (
                    { name: 'list', params: { emisor: usuario.id } }
                )
            }
        },
        iniciarSesion: function () {
            this.validarUsuario();
        },
        validarUsuario: function () {
            let that = this;
            this.loading = true;
            this.errorLogin = false;
            axios.get(`https://api.airtable.com/v0/appCswOBjla31jRfk/User?view=Grid%20view&filterByFormula=AND(UPPER({Username})="${that.username.toUpperCase()}", {Password}="${that.password}")`)
            .then(function (response) {
                if (response.data.records.length > 0) {
                    // guardamos el usuario, 'usuario' nombre que damos nosotros
                    localStorage.setItem('usuario', JSON.stringify({
                            id: response.data.records[0].id,
                            username: that.username
                        }));
                    // cambiamos de pantalla a lista de usuarios
                    that.$router.push(
                        { name: 'list', params: { emisor: response.data.records[0].id} }
                    );
                } else {
                    // usuario no existe
                    that.errorLogin = true
                }
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                that.loading = false;
            });
        }
    }
}

</script>
<style lang="postcss" scoped>
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    .home {
        height: 100vh;
        background-image: linear-gradient(darkgreen, darkorchid);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .choose {
        position: fixed;
        top: 0;
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: honeydew;
    }
    .registro, .login {
        margin: 2rem;
        font-size: 1rem;
    }
    .desactivado {
        color: greenyellow;
    }
    .registrarse, .logearse {
        display: flex;
        flex-direction: column;
    }
    .reg-input {
        margin: .5rem;
    }
    .incorrecto {
        outline: 3px solid darkred;
    }
    .correcto {
        outline: 3px solid lightgreen;
    }
</style>