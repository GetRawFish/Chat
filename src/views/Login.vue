<template>
    <div class="user container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="home">
            <div class="choose">
                <router-link :to="{ name: 'registro'}"><h1 class="registro activo">
                    Registrarse
                </h1></router-link>
                <h1 class="login desactivado">
                    Logearse
                </h1>
            </div>
            <div class="logearse">
                <label for="name" class="reg-input">Username</label>
                <input type="text" class="reg-input" name="name" placeholder="username">
                <p></p>
                <label for="password" class="reg-input">Password</label>
                <input type="password" class="reg-input" name="password" placeholder="password">
                <p></p>
                <input type="button" value="Logearse" class="reg-input reg-button">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'login',
    components: {
    },
    data: function () {
        return {
            usuarios: [],
            loading: true,
            username: '',
            password: '',
            rePassword: '',
            error: false,
            mensajeError: '',

        }
    },
    /* mounted: function () {
        let that = this;
        if (!this.error) {
            axios.get(`https://api.airtable.com/v0/appCswOBjla31jRfk/User?view=Grid%20viewfilterByFormula=AND({Username}="${that.username}", {Password}="${that.password}"`)
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
    },
    methods: {
        registrarse: function () {
            
        }
    } */
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