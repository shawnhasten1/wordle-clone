<template>
  <div id="app">
    <div id="keyboard-holder">
      <div class="keyboard-layout" id="keyboard-layout-1">
        <Keyboard v-for="keyboard in keyboards[0]" :key="keyboard" :keyboard="keyboard"/>
      </div>    
      <div class="keyboard-layout" id="keyboard-layout-2">
        <Keyboard v-for="keyboard in keyboards[1]" :key="keyboard" :keyboard="keyboard"/>
      </div>    
      <div class="keyboard-layout" id="keyboard-layout-3">
        <Keyboard v-for="keyboard in keyboards[2]" :key="keyboard" :keyboard="keyboard"/>
      </div>    
    </div>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import { generateKeyboards } from "./utils";

export default {
  name: 'App',
  components: {
    Keyboard
  },
  data: function(){
    return{
      keyboards: generateKeyboards()
    }
  }
}
</script>

<style>
body{
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: brown;
  width: 100vw;
}
#keyboard-holder{
  position: absolute;
  bottom: 0px;
  width: 100vw;
  justify-content: center;
}
.keyboard-layout{
  display: grid;
  gap: 1vw;
  padding: .5vw;
  justify-content: center;
}
#keyboard-layout-1{
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
}
#keyboard-layout-2{
  grid-template-columns: auto auto auto auto auto auto auto auto auto;
}
#keyboard-layout-3{
  grid-template-columns: auto auto auto auto auto auto auto auto auto;
}
</style>
