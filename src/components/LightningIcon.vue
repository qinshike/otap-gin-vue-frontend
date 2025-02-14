<template>
  <span class="lightning-circle">
    <svg class="lightning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 48" width="30" height="70">
      <!-- 调整后的细长闪电图形，并旋转了20° -->
      <path d="M12 0 L8 18 L14 18 L6 48 L16 30 L12 30 L12 0 Z" fill="none" stroke="#FFD700" stroke-width="4"/>
    </svg>
  </span>
</template>

<script>
export default {
  name: "LightningIcon",
};
</script>

<style scoped>
.lightning-circle {
  display: inline-block;
  background-color: #000000; /* 圆圈背景色 */
  border-radius: 50%; /* 使其成为正圆 */
  padding: 15px; /* 内边距，确保闪电图标不紧贴圆圈 */
  border: 4px solid #000000; /* 设置黑色边框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果，增加深度感 */
  text-align: center;
  vertical-align: middle; /* 垂直居中 */
  width: 70px; /* 设置圆圈的固定宽度 */
  height: 70px; /* 设置圆圈的固定高度，确保正圆 */
}

.lightning {
  width: 40px; /* 控制闪电图标大小 */
  height: 70px; /* 增加闪电的高度，使其更细长 */
  filter: drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 20px #FFD700); /* 荧光效果 */
  animation: glow 1.5s ease-in-out infinite alternate, breathe 4s ease-in-out infinite; /* 闪烁和呼吸灯效果 */
  transform: rotate(20deg); /* 顺时针旋转20度 */
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 20px #FFD700);
  }
  100% {
    filter: drop-shadow(0 0 15px #FFD700) drop-shadow(0 0 25px #FFD700);
  }
}

@keyframes breathe {
  0% {
    filter: drop-shadow(0 0 5px #FFD700) drop-shadow(0 0 10px #FFD700);
  }
  50% {
    filter: drop-shadow(0 0 25px #FFD700) drop-shadow(0 0 40px #FFD700); /* 更强的光晕效果 */
  }
  100% {
    filter: drop-shadow(0 0 5px #FFD700) drop-shadow(0 0 10px #FFD700);
  }
}
</style>
