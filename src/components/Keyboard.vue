<template>
    <div class="key" :style="{width:width, maxWidth:width}">
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
        }
    }
}
</script>

<style scoped>
.key{
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 1vw;
  padding-top: 4vw;
  padding-bottom: 4vw;
  font-size: 20px;
  text-align: center;
  width: 5vw;
  max-width: 5vw;
}
</style>