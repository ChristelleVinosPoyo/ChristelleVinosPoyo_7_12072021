<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0 auto;
  max-width: 1700px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #091f43;
}
a {
  text-decoration: none;
  color: white;
}
nav {
  background-color: #091f43;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: right;
}

button {
  color: white;
  border-radius: 20px;
  padding: 3px 8px 3px 8px;
  background: #d1515a;
  border: none;
  margin: 3px;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: transform 200ms;
}
.button:hover {
  transform: scale(1.05);
}
.footer{
  margin-top: 10px;
  background-color: #091f43;
  height: 50px;
  overflow: hidden;
  & img{
    margin: 0;
    width: 200px;
  }
}

</style>
