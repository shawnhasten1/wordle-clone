<template>
    <div class="guess_tile" :style="{ backgroundColor:bgColor }">
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
        },
        bgColor(){
            if(this.guess_tile.status == 'known') return 'rgb(179, 150, 22)';
            if(this.guess_tile.status == 'solved') return 'rgb(36, 131, 27)';
            return 'rgba(0, 0, 0, 0)';
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
  border-radius: 5px;
}
</style>