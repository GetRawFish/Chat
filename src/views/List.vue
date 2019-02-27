<template>
    <div class="list container">
        <!-- <router-link to="/">Home</router-link> -->
        <div class="header">
            <h1 class="header-title">Chats activos</h1>
        </div>
        <div class="search">
            <div class="search-field">
                <button class="search-button"><i class="fas fa-search"></i></button>
                <input type="text" class="search-input" v-model="lookUp">
            </div>
        </div>
        <Loading v-if="loading"></Loading>
        <div class="contacts">
            <div class="contacts-user" v-for="user in usersFilter" :key="user.id">
                <div class="contacts-user-avatar"></div>
                <div class="contacts-user-info">
                    <h2 class="contacts-user-name" >{{ user.fields.Username }}</h2>
                    <!-- <p class="contacts-user-last-message">Lorem ipsum dolor sit amet...</p> -->
                </div>
                <router-link :to="{ name: 'chat', params: { emisor: $route.params.emisor, receptor: user.id }}" class="contacts-user-go"><i class="fas fa-chevron-right"></i></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
export default {
    name: 'list',
    components: {
        Loading
    },
    data: function () {
        return {
            users: undefined,
            loading: true,
            lookUp: ''
        }
    },
    mounted: function () {
        let that = this;
        axios.get('https://api.airtable.com/v0/appCswOBjla31jRfk/User?view=Grid%20view')
            .then(function (response) {
                that.users = response.data.records;
                that.loading = false;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },
    computed: {
        usersFilter: function () {
            let shortListUsers = [];
            if (this.users != undefined) {
                for (let user of this.users) {
                    if (this.lookUp == '' || user.fields.Username.toUpperCase().includes(this.lookUp.toUpperCase())) {
                        shortListUsers.push(user);
                    }
                }
            }
            return shortListUsers;
        }
    }
}
</script>
<style lang="postcss" scoped>
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    .list {
        background-image: linear-gradient(-45deg, cornflowerblue, peru);
        height: 100vh;
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
    .search {
        background-color: white;
        margin-top: 70px;
        height: 70px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-field {
        height: 40px;
        width: 80%;
        background-color: lightgrey;
        border-radius: 13px;
        box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .25rem 1rem;
    }
    .search-button {
        font-size: 1.5rem;
    }
    .search-input {
        background-color: transparent;
        border-bottom: 2px solid black;
        padding: .25rem;
    }
    .search-input:focus {
        outline: initial;
    }
    .contacts-user {
        height: 80px;
        background-color: white;
        margin: .5rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .contacts-user-info {
        width: 55%;
    }
    .contacts-user-avatar {
        height: 50px;
        width: 50px;
        background-color: cadetblue;
        border-radius: 50px;
        margin: 0 1rem;
    }
    .contacts-user-go {
        color: black;
        font-size: 2rem;
        margin: 0 1rem;
    }
    .contacts-user-last-message {
        font-weight: 300;
        color: gray;
    }
</style>
