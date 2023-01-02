<template>
  <div id="app" :class="{ shake: shake }">
    <div id="guess-holder">
      <div class="guess-row" v-for="guess in guesses" :key="guess">
        <GuessTile v-for="guess_tile in guess" :key="guess_tile" :guess_tile="guess_tile"/>
      </div>
    </div>
    <div id="keyboard-holder">
      <div class="keyboard-layout" id="keyboard-layout-1">
        <Keyboard v-for="keyboard in keyboards[0]" @setGuess="setGuess(keyboard)" :key="keyboard" :keyboard="keyboard"/>
      </div>    
      <div class="keyboard-layout" id="keyboard-layout-2">
        <Keyboard v-for="keyboard in keyboards[1]" @setGuess="setGuess(keyboard)" :key="keyboard" :keyboard="keyboard"/>
      </div>    
      <div class="keyboard-layout" id="keyboard-layout-3">
        <Keyboard v-for="keyboard in keyboards[2]" @setGuess="setGuess(keyboard)" :key="keyboard" :keyboard="keyboard"/>
      </div>    
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Keyboard from './components/Keyboard.vue'
import GuessTile from './components/GuessTile.vue'
import { generateKeyboards, generateGuesses } from "./utils";

export default {
  name: 'App',
  components: {
    Keyboard,
    GuessTile
  },
  data: function(){
    return{
      keyboards: generateKeyboards(),
      guesses:generateGuesses(),
      current_col:0,
      current_row:0,
      shake:false
    }
  },
  methods:{
    setGuess(key){
      if(key.value == 'DEL'){
        if(this.current_row>0){
          this.current_row--;
          this.guesses[this.current_col][this.current_row].value = '.';
        }
      }
      else if(key.value == 'ENTER'){
        if(this.current_row == 5){
          var full_guess = '';
          for(var i = 0; i<5; i++){
            full_guess += this.guesses[this.current_col][i].value;
          }
            axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/"+full_guess).catch(error=>{
              console.log(error.response)
              this.shake = true
              setTimeout(() => {
                this.shake = false
              }, 1500)
            })
        }
        else{
          console.log('Failed')
        }
      }
      else if(this.current_row<5){
        this.guesses[this.current_col][this.current_row].value = key.value;
        this.current_row++;
      }
    }
  }
}
</script>

<style>
body{
  margin: 0px;
  background-color: rgb(27, 27, 27);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(27, 27, 27); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
#keyboard-holder{
  position: absolute;
  bottom: 0px;
  width: 100vw;
  justify-content: center;
}
.keyboard-layout{
  display: grid;
  gap: .2vw;
  padding: .2vw;
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
#guess-holder{
  height: 65vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
.guess-row{
  width: 100vw;
  justify-content: center;
  display: grid;
  gap: .2vw;
  grid-template-columns: auto auto auto auto auto;
  padding: .2vw;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
