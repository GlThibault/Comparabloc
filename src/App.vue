<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/about">À propos</router-link>
  </nav>
  <header>
    <h1>Comparabloc</h1>
  </header>
  <router-view />
  <svg class="backgroundMountain" id="svg" viewbox="0 0 100 100">
    <filter id="blur">
      <feGaussianBlur stdDeviation="1" />
    </filter>
    <path id="mountain" fill="#ab9457" d="" />
  </svg>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  width: 95vw;
  max-width: 800px;
  margin: auto;
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
div {
  color: #eee;
}

h1,
h2 {
  font-family: Lato;
  margin-top: 0;
}

nav {
  font-size: 1rem;
  line-height: 2;
  padding: 1rem 0 0 0;
}

nav a,
nav a:visited {
  margin: 0 1rem 1rem 0;
  border-radius: 5px;
  color: #eee;
  display: inline-block;
  padding: 0.1rem 1rem;
  text-decoration: none;
  background: #2c3e50;
}

nav a.router-link-active {
  color: #ffb300;
}

.backgroundMountain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
}

.backgroundMountain path {
  transform: translate(0, 90%);
  z-index: -1;
}

.parentCloud {
  animation: clouds 30s linear infinite;
}

.cloud {
  transform-origin: 50%;
  &.blur {
    filter: url(#blur);
  }
}

.sky-gradient-0 {
  background: linear-gradient(to bottom, #4a4969 0%, #7072ab 50%, #cd82a0 100%);
}

.sky-gradient-1 {
  background: linear-gradient(to bottom, #757abf 0%, #8583be 60%, #eab0d1 100%);
}

.sky-gradient-2 {
  background: linear-gradient(to bottom, #82addb 0%, #ebb2b1 100%);
}

.sky-gradient-3 {
  background: linear-gradient(to bottom, #94c5f8 1%, #a6e6ff 70%, #b1b5ea 100%);
}

.sky-gradient-4 {
  background: linear-gradient(to bottom, #1e528e 0%, #265889 50%, #9da671 100%);
}
.sky-gradient-5 {
  background: linear-gradient(to bottom, #1e528e 0%, #728a7c 50%, #e9ce5d 100%);
}
.sky-gradient-6 {
  background: linear-gradient(
    to bottom,
    #154277 0%,
    #576e71 30%,
    #e1c45e 70%,
    #b26339 100%
  );
}
.sky-gradient-7 {
  background: linear-gradient(
    to bottom,
    #163c52 0%,
    #4f4f47 30%,
    #c5752d 60%,
    #b7490f 80%,
    #2f1107 100%
  );
}

@keyframes clouds {
  0% {
    transform: translate(-110vw, 0);
  }
  100% {
    transform: translate(250vw, 0);
  }
}
</style>
