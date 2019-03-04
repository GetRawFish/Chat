<template>
    <div class="user container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="home">
            <div class="choose">
                <h1 class="registro activo">
                    Registrarse
                </h1>
                <router-link :to="{ name: 'login'}"><h1 class="login desactivado">
                    Logearse
                </h1></router-link>
            </div>
            <div class="registrarse">
                <p v-if="warning">Debes completar todos los datos</p>
                <label for="name" class="reg-input">Username</label>
                <input type="text" class="reg-input" name="name" placeholder="username" v-model="username" @input="retardoComprobarUsername">
                <p v-if="usernameError">El usuario ya existe</p>
                <label for="password" class="reg-input">Password</label>
                <input type="password" class="reg-input" name="password" placeholder="password" v-model="password">
                <label for="re-password" class="reg-input">Re-Password</label>
                <input type="password" class="reg-input" name="re-password" placeholder="re-password" v-model="rePassword">
                <p v-if="password === rePassword"></p>
                <p v-else>Las contraseñas deben ser iguales</p>
                <input type="button" value="Registrarse" class="reg-input reg-button" @click="enviarDatos">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'registro',
    components: {
    },
    data: function () {
        return {
            loading: false,
            username: '',
            usernameError: false,
            password: '',
            rePassword: '',
            errorPassword: false,
            warning: false
        }
    },
    mounted: function () {
    },
    methods: {
        comprobarUsername: function () {
            let that = this;
            axios.get(`https://api.airtable.com/v0/appCswOBjla31jRfk/User?view=Grid%20view&filterByFormula=AND(UPPER({Username})="${that.username.toUpperCase()}")`)
            .then(function (response) {
                if(response.data.records.length > 0) {
                    that.usernameError = true;
                } else {
                    that.usernameError = false;
                }
                app.loading = false;
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        },
        retardoComprobarUsername: function () {
            setTimeout(this.comprobarUsername, 200)
        },
        enviarDatos: function () {
            let that = this;
            if (this.username != '' && ((this.password != '' && this.rePassword != '') || this.password === this.rePassword)) {
                axios.post('https://api.airtable.com/v0/appCswOBjla31jRfk/User?view=Grid%20view', {
                    "fields": {
                        "Username": that.username,
                        "Password": that.password,
                    }
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
            } else {
                this.warning = true;
            }
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