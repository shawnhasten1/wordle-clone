<template>
    <div class="key" :style="{width:width, maxWidth:width, backgroundColor:bgColor}" @click="$emit('setGuess')">
        {{ keyboard.value }}
    </div>
</template>

<script>
export default{
    props:{
        keyboard: Object
    },
    computed: {
        width(){
            if(this.keyboard.value == 'ENTER' || this.keyboard.value == 'DEL') return '9vw';
            return '5vw'; 
        },
        bgColor(){
            if(this.keyboard.status == 'unknown') return 'rgb(155, 155, 155)';
            if(this.keyboard.status == 'known') return 'rgb(179, 150, 22)';
            if(this.keyboard.status == 'solved') return 'rgb(36, 131, 27)';
            return 'rgb(65, 65, 65)';
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

</style>