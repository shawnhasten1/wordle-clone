<template>
    <div class="key" :style="{width:width, maxWidth:width, backgroundColor:bgColor}" @click="$emit('setGuess')" :disabled="letters=='false'">
        {{ keyboard.value }}
    </div>
</template>

<script>
export default{
    props:{
        keyboard: Object,
        letters:String
    },
    computed: {
        width(){
            if(this.keyboard.value == 'ENTER' || this.keyboard.value == 'DEL') return '9vw';
            return '5vw'; 
        },
        bgColor(){
            if(this.letters == 'unknown') return 'rgb(125, 125, 125)';
            if(this.letters == 'known') return 'rgb(179, 150, 22)';
            if(this.letters == 'solved') return 'rgb(36, 131, 27)';
            return 'rgb(35, 35, 35)';
        }
    }
}
</script>

<style scoped>
.key{
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: .5vw;
  padding-top: 2vw;
  padding-bottom: 2vw;
  font-size: 20px;
  text-align: center;
  width: 3vw;
  max-width: 3vw;
  border-radius: 10px;
  color: white;
  transition: .5s;
}
.key:hover{
    opacity: .8;
    cursor: pointer;
}
.key[disabled=disabled]{
    opacity: 1 !important;
    cursor: default !important;
}
</style>