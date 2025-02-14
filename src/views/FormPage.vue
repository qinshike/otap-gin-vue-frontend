<template>
  <div class="form-container">
    <h2>填写车辆信息</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="vin">车架号</label>
        <input type="text" id="vin" v-model="vin" required />
      </div>
      <div class="form-group">
        <label for="carSeries">车系</label>
        <input type="text" id="carSeries" v-model="carSeries" disabled />
      </div>
      <div class="form-group">
        <label for="carModel">车型</label>
        <input type="text" id="carModel" v-model="carModel" disabled />
      </div>
      <div class="form-group">
        <label for="specialOrder">特殊订单</label>
        <input type="text" id="specialOrder" v-model="specialOrder" disabled />
      </div>
      <div class="form-group">
        <label for="factory">工厂</label>
        <input type="text" id="factory" v-model="factory" disabled />
      </div>
      <div class="form-group">
        <label for="workstation">触发工位</label>
        <input type="text" id="workstation" v-model="workstation" disabled />
      </div>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      vin: "",
      carModel: "",
      carSeries: "",
      specialOrder: "",
      factory: this.$route.query.base, // 从路由获取工厂
      workstation: this.$route.query.workstation, // 从路由获取工位
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("/api/vehicle-info", { vin: this.vin });
        const data = response.data;
        this.carModel = data.carModel;
        this.carSeries = data.carSeries;
        this.specialOrder = data.specialOrder;
      } catch (err) {
        console.error("获取车辆信息失败", err);
      }
    }
  }
};
</script>

<style scoped>
/* 表单样式 */
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
