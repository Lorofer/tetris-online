<template>
<div class="logo-container">
  <img src="../../public/logo.png" alt="Tetris">
</div>
</template>

<style scoped lang="scss">
.logo-container{
  width: 216px;
  height: 91px;
  display: flex;
  align-items: end;

  img{
    height: 78px;
  }
  @media screen and (max-height: 700px){
    width: 155px;
    height: 67px;
    img{
      height: 58px;
    }
  }
}
</style>
