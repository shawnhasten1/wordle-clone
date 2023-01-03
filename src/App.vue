<template>
  <div id="app" :class="{ shake: shake }">
    <div id="alert-holder">
      <div class="alert alert-box" v-if="shake">
        <p>Not a word!</p>
      </div>
      <div class="alert success-box" v-if="solved">
        <p>Congratulations!</p>
      </div>
    </div>
    <div id="guess-holder">
      <div class="guess-row" v-for="(guess, index) in guesses" :key="index">
        <GuessTile v-for="(guess_tile, index) in guess" :key="index" :guess_tile="guess_tile"/>
      </div>
    </div>
    <div id="keyboard-holder">
      <div class="keyboard-layout" id="keyboard-layout-1">
        <Keyboard v-for="(keyboard, index) in keyboards[0]" @setGuess="setGuess(keyboard)" :key="index" :letters="setLetters(keyboard.value)" :keyboard="keyboard"/>
      </div>    
      <div class="keyboard-layout" id="keyboard-layout-2">
        <Keyboard v-for="(keyboard, index) in keyboards[1]" @setGuess="setGuess(keyboard)" :key="index" :letters="setLetters(keyboard.value)" :keyboard="keyboard"/>
      </div>    
      <div class="keyboard-layout" id="keyboard-layout-3">
        <Keyboard v-for="(keyboard, index) in keyboards[2]" @setGuess="setGuess(keyboard)" :key="index" :letters="setLetters(keyboard.value)" :keyboard="keyboard"/>
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
      answer:'',
      keyboards: generateKeyboards(),
      guesses:generateGuesses(),
      current_col:0,
      current_row:0,
      shake:false,
      known_letters:[],
      solved_letters:[],
      false_letters:[],
      solved:false
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
                this.shake = false;
              }, 1500)
            }).then(response=>{
              try{
                console.log(response.status);
                this.checkAnswer();
              }catch(error){
                console.log('error')
              }
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
    },
    checkAnswer(){
      console.log('Checking Answer');
      var correct = true;
      for(var i = 0; i<5; i++){
        if(this.answer.charAt(i) == this.guesses[this.current_col][i].value){
          this.guesses[this.current_col][i].status = 'solved';
          this.solved_letters.push(this.guesses[this.current_col][i].value);
        }
        else if(this.answer.includes(this.guesses[this.current_col][i].value)){
          this.guesses[this.current_col][i].status = 'known';
          this.known_letters.push(this.guesses[this.current_col][i].value);
          correct = false;
        }
        else{
          this.false_letters.push(this.guesses[this.current_col][i].value);
          correct = false;
        }
      }
      this.current_col++;
      this.current_row=0;
      if(correct){
        this.solved = true;
        this.current_col=-1;
        this.current_row=-1;
      }
    },
    setLetters(key){
      if(this.solved_letters.includes(key)){
        return 'solved';
      }
      if(this.known_letters.includes(key)){
        return 'known';
      }
      if(this.false_letters.includes(key)){
        return 'false';
      }
      return 'unknown';
    },
    generateWord(){
      axios.get("https://random-word-api.herokuapp.com/word?length=5").then(response=>{
        console.log(response.data)
        this.answer = String(response.data[0]).toUpperCase();
      })
    }
  },
  beforeMount(){
    this.generateWord();
  }
}
</script>

<style>
body{
  margin: 0px;
  background-color: rgb(27, 27, 27);
  overflow: hidden;
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
  background: rgb(155, 155, 155); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(105, 105, 105); 
  transition: .5s;
}
#alert-holder{
  position: absolute;
  display: grid;
  top: 20px;
  width: 100vw;
  justify-content: center;
}
.alert{
  color: white;
  width: 250px;
  text-align: center;
  padding: .2em;
  border-radius: 5px;
  font-size: 20px;
}
.alert-box{
  background-color: rgb(196, 50, 40);
}
.success-box{
  background-color: rgb(40, 196, 100);
}
#keyboard-holder{
  position: absolute;
  display: grid;
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
