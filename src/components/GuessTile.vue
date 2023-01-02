<template>
    <div class="guess_tile">
        <span :style="{visibility:visible}">{{ guess_tile.value }}</span>
    </div>
</template>

<script>
export default{
    props:{
        guess_tile: Object
    },
    computed: {
        visible(){
            if(this.guess_tile.value == '.') return 'hidden';
            return 'visible';
        }
    }
}
</script>

<style scoped>
.guess_tile{
  border: 1px solid white;
  padding: .5vw;
  padding-top: 2.5vw;
  padding-bottom: 2.5vw;
  width: 5vw;
  max-width: 5vw;
  text-align: center;
  color: white;
  font-size: 40px;
}
</style>