<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import Subscription from './components/Subscription'
    import MainPage from './components/MainPage'
    import MainNewPage from './components/MainNewPage'

    export default {
        name: 'app',
        components: {
            Subscription,
            MainPage,
            MainNewPage
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    body .el-table th.gutter {
        display: table-cell !important;
    }

    body .el-table colgroup.gutter {
        display: table-cell !important;
    }
</style>
