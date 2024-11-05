<template>
    <!-- <div class="home-container"> -->
    <header class="home-header">
        <div class="home-header-div">
            <nav class="header-nav">
            </nav>
        </div>
    </header>
    <article class="home-article">
        <router-link class="home-nav-link" to="/quizz">Quizz</router-link>
        <router-link class="home-nav-link" to="/pokedex">Pokédex</router-link>
    </article>
    <footer class="home-footer">
        <div></div>
    </footer>
    <!-- </div> -->
</template>

<script setup>
</script>

<style scoped>
/* .home-container {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    margin: 20px;
    width: auto;
    height: auto;
} */
.home-header {
    background-color: rgb(0, 0, 0, 0.5);
    box-shadow: inset 0 -1px 3px rgba(255, 255, 255, 0.9);
    position: fixed;
    padding: 0 10px;
    top: 0;
    left: 0;
    height: 10%;
    width: 100%;
}
.home-header-div {
    display: flex;
    align-items: center;
    border-spacing: 0;
    border-collapse: collapse;
    /* border-top: 1px solid #c8ccd1; */
    margin-top: -1px;
    height: 3.375em;
    width: 100%;
    white-space: nowrap;
}
.home-article {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    height: 100px;
    width: 100%;
}
.home-footer {
    background-color: rgb(0, 0, 0, 0.5);
    box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.9);
    position: fixed;
    bottom: 0;
    left: 0;
    height: 10%;
    width: 100%;
}
.home-nav-link {
    color: #ffffff;
    background-color: #1933a5;
    padding: 10px 20px;
    margin: auto;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    white-space: nowrap;
    height: auto;
    width: auto;
}
.is-active {
    color: #ffffff !important;
    filter: brightness(100%) !important;
    text-shadow: 2px 2px 10px #000000 !important;
}
.home-nav-link:hover {
    color: #ffffff !important;
    filter: brightness(100%) !important;
    text-shadow: 2px 2px 10px #000000 !important;
}
</style>