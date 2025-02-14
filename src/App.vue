<template>
  <div id="app" class="container">
    <!-- Header区域 -->
    <div class="header"></div>

    <!-- 加载状态和错误提示 -->
    <div v-if="loading" class="loading">正在加载数据...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- 基地选择按钮 -->
    <div v-else-if="showBase" class="grid-container">
      <div v-for="(group, index) in bases" :key="index">
        <div class="group-header">
          <span class="group-key">{{ group.groupName }}</span>
        </div>
        <div class="base-buttons">
          <div class="base-group">
            <button
              v-for="(base, index) in group.bases"
              :key="index"
              class="base-button"
              @click="loadWorkstations(base)"
            >
              {{ base }}
            </button>
          </div>
        </div>
        <div class="separator"></div> <!-- 分组之间的横线 -->
      </div>
    </div>

    <!-- 触发工位选择按钮 -->
    <div v-else-if="showWorkstations" class="grid-container">
      <button class="back-button" @click="goBackToBase">返回上一页</button>
      <button
        v-for="(workstation, index) in workstations"
        :key="index"
        class="workstation-button"
        @click="loadFunctions(workstation)"
      >
        {{ workstation }}
      </button>
    </div>

    <!-- 功能选择按钮 -->
    <div v-else class="grid-container">
      <button class="back-button" @click="goBackToWorkstation">返回上一页</button>

      <button
        v-for="(func, index) in functions"
        :key="index"
        class="function-button"
        @click="navigateToForm(func)"
      >
        {{ func }}

      </button>
    </div>


 <footer class="footer">
   <p class="quote">惟臻至善,奋楫笃行</p>
   <p>&copy; 2025 技术中心总装工艺部电检组</p>
 </footer>

  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bases: [], // 基地数据从接口获取
      workstations: [], // 触发工位列表
      functions: [], // 功能列表
      loading: false,
      error: null,
      showBase: true, // 控制页面显示
      showWorkstations: false, // 控制是否显示触发工位选择页面
    };
  },
  created() {
    // 页面加载时获取基地数据
    this.loadBases();
  },
  methods: {
    async loadBases() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/bases");
        this.bases = this.groupBases(response.data.bases || []);
      } catch (err) {
        this.error = "加载基地数据失败，请稍后重试。";
        console.error("请求错误:", err);
      } finally {
        this.loading = false;
      }
    },

    // 新增一个函数用于按前两个字分组
    groupBases(bases) {
      const grouped = {};
      bases.forEach(base => {
        const groupKey = base.substring(0, 2); // 取前两个字作为分组
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(base);
      });

      // 返回一个数组，格式化为“分组名称 - 基地名称”的形式
      return Object.keys(grouped).map(group => {
        return { groupName: group, bases: grouped[group] };
      });
    },

    async loadWorkstations(base) {
      this.loading = true;
      this.error = null;
      console.log("选中的基地是：", base);
      try {
        const response = await axios.get(`/api/workstations?factory=${base}`);
        this.workstations = response.data.workstations || [];
        this.showBase = false;
        this.showWorkstations = true;
      } catch (err) {
        this.error = "加载触发工位数据失败，请稍后重试。";
        console.error("请求错误:", err);
      } finally {
        this.loading = false;
      }
    },

    async loadFunctions(workstation) {
      this.loading = true;
      this.error = null;
      console.log("选中的触发工位是：", workstation);
      try {
        const response = await axios.get("/api/functions");
        this.functions = response.data.functions || [];
        this.showWorkstations = false;
      } catch (err) {
        this.error = "加载功能数据失败，请稍后重试。";
        console.error("请求错误:", err);
      } finally {
        this.loading = false;
      }
    },

    navigateToForm(func) {
		
      this.$router.push({ name: "FormPage", query: { func: func } });
    },

    goBackToBase() {
      this.showBase = true;
      this.workstations = [];
      this.functions = [];
      this.showWorkstations = false;
    },

    goBackToWorkstation() {
      this.showWorkstations = true;
      this.functions = [];
      this.showBase = false;
    },
},
};
</script>

<style scoped>
/* 页面整体布局 */
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  padding-bottom: 60px; /* 增加底部留白 */
}

.header {
  width: 100%;
  height: 150px; /* 16:9 比例 */
  background-color: transparent;
}

/* 加载和错误提示样式 */
.loading,
.error {
  font-size: 1rem;
  color: #e74c3c;
  margin: 10px 0;
  text-align: center;
}

/* Grid 布局 */
/* Grid 布局容器间距调整 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 让按钮的列数自动调整 */
  gap: 10px; /* 减小按钮之间的间距 */
  width: 100%;
  max-width: 700px;
  margin: 15px auto;
}

/* Button 基本样式 */
button {
  width: 100%; /* 每个按钮的宽度都占满一个单元格 */
  padding: 12px 16px;
  font-size: 1.1rem;
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
  text-align: center;
  box-sizing: border-box; /* 确保 padding 不影响按钮的总宽度 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 改为阴影效果 */
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* 按钮 hover 特效 */
button:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3); /* 更强的阴影效果 */
  transform: scale(1.05); /* 按钮放大效果 */
}

/* 基地按钮组样式 */
.base-buttons {
  display: block;
  gap: 15px; /* 增加按钮之间的间隔 */
}

/* 每个基地按钮样式 */
.base-button {
  background-color: #4caf50;
  color: white;
  width: 100%; /* 保持按钮宽度一致 */
  padding: 12px 16px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 改为阴影效果 */
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* 基地按钮 hover 特效 */
.base-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 增加阴影 */
  transform: scale(1.05); /* 按钮放大效果 */
}

/* 基地组标题样式 */
.group-header {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 15px; /* 增加顶部间距 */
  margin-bottom: 5px;
  text-align: center;
}

.group-key {
  display: inline-block;
  background-color: white; /* 白色背景 */
  color: black; /* 黑色字体 */
  padding: 12px 0; /* 与其他按钮一致的高度 */
  width: 100%; /* 与按钮宽度一致 */
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  margin-bottom: 10px; /* 增加框与按钮之间的间距 */
}

/* 功能按钮样式 */
.function-button {
  background-color: #1e90ff; /* 蓝色 */
  color: white;
  width: 100%; /* 占满一整行 */
  padding: 12px 16px; /* 保持一致的内边距 */
  margin-bottom: 10px; /* 减小按钮之间的间距 */
  border-radius: 8px; /* 保证按钮圆角一致 */
  text-align: center; /* 确保文字居中对齐 */
  font-weight: normal; /* 取消加粗 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 改为阴影效果 */
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* 功能按钮 hover 特效 */
.function-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 阴影 */
  transform: scale(1.05); /* 按钮放大效果 */
}

/* 返回按钮样式 */
.back-button {
  background-color: gray; /* 灰色 */
  color: white;
  width: 100%; /* 占满一整行 */
  padding: 12px 16px; /* 保持一致的内边距 */
  margin-bottom: 10px; /* 减小按钮之间的间距 */
  border-radius: 8px; /* 保证按钮圆角一致 */
  text-align: center; /* 确保文字居中对齐 */
  font-weight: normal; /* 取消加粗 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 改为阴影效果 */
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* 返回按钮 hover 特效 */
.back-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 阴影 */
  transform: scale(1.05); /* 按钮放大效果 */
}

/* 工位按钮样式 - 橙色 */
.workstation-button {
  background-color: #ffaa00; /* 橙色背景 */
  color: white;
  width: 100%; /* 保证按钮宽度占满一行 */
  padding: 12px 16px; /* 保持一致的内边距 */
  margin-bottom: 10px; /* 减小按钮之间的间距 */
  border-radius: 8px; /* 保证按钮圆角一致 */
  text-align: center; /* 确保文字居中对齐 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 改为阴影效果 */
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* 工位按钮 hover 特效 */
.workstation-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 阴影 */
  transform: scale(1.05); /* 按钮放大效果 */
}


.footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: #ffffff;
  color: #ccc;
  font-size: 0.9rem;
  text-align: center;
  padding: 5px 0; /* 调小上下间距 */
  font-family: "Xingkai", "KaiTi", "楷体", serif; /* 使用行楷字体 */
}

.footer p {
  margin: 5px 0;
}

.footer .quote {
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
  letter-spacing: 2px; /* 增加字母间距 */
}

</style>