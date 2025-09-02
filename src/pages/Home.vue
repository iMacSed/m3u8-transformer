<template>
    <div class="container">
        <!-- 添加flex容器用于垂直排列 -->
        <div class="content-wrapper">
            <!-- 转换前 -->
            <div class="section-container">
                <div class="section-header">
                    <span class="section-title">M3U8地址集</span>
                    <t-button theme="danger" @click="clear">清空</t-button>
                </div>
                <t-textarea
                    v-model="addressSet"
                    class="input-area"
                    placeholder="请输入地址集，每行一个地址"
                    name="addressSet"
                    @change="transform"
                    :autosize="{ minRows: rows, maxRows: rows }"
                />
            </div>

            <!-- 转换后 -->
            <div class="section-container">
                <div class="section-header">
                    <span class="section-title">转换后</span>
                    <t-button type="primary" @click="copy">复制</t-button>
                </div>
                <t-textarea
                    v-model="afterTrans"
                    class="input-area"
                    placeholder=""
                    name="afterTrans"
                    :autosize="{ minRows: rows, maxRows: rows }"
                    readonly
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="jsx">
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import { MessagePlugin } from 'tdesign-vue-next';

const rows = 16;
// 转换前的地址集
const addressSet = ref("");
// 转换后的地址集
const afterTrans = ref("");

// 清空
function clear() {
    addressSet.value = "";
    afterTrans.value = "";
}

// 地址转换
function transform() {
    let str = addressSet.value;

    // 需要处理可能存在的空行
    let lines = str.split('\n').filter(line => line.trim() !== '');

    // 遍历数组，添加序号后缀
    const result = lines.map((url, index) => {
        /**
         * 计算序号（从1开始）并格式化为两位数字
         * padStart(2, '0')确保序号是两位数，如 1 变成 "01"，10 保持 "10"
         */
        const suffix = `----${(index + 1).toString().padStart(2, '0')}`;
        return url + suffix;
    }).join('\n'); // 重新拼接成字符串

    afterTrans.value = result;
}

// 复制转换后的地址集
function copy() {
    // 创建一个临时输入框
    const textarea = document.createElement('textarea');
    textarea.value = afterTrans.value;
    document.body.appendChild(textarea);
  
    // 选中并复制
    try {
        textarea.select();
        document.execCommand('copy');
        MessagePlugin.success('复制成功');
    } catch (e) {
        MessagePlugin.error(`复制失败${e}`);
    }
  
    // 清理临时元素
    document.body.removeChild(textarea);
}

</script>

<style lang="scss">
.container {
    padding: 2% 2%;
    /* 设置容器最小高度为视口高度，确保充满屏幕 */
    min-height: 100vh;
    box-sizing: border-box;
}

/* 修改为垂直排列并平分高度 */
.content-wrapper {
    display: flex;
    flex-direction: column; /* 改为垂直排列 */
    gap: 20px;
    height: 100%; /* 填充容器高度 */
}

/* 每个区域容器平分高度 */
.section-container {
    flex: 1; /* 关键：两个区域各占50%高度 */
    display: flex;
    flex-direction: column;
}

.input-area {
    margin-top: 1%;
    width: 100%;
    /* 文本框占满区域容器剩余空间 */
    flex-grow: 1;
}

/* 移除原移动端水平转垂直的媒体查询（现在默认垂直布局） */

/* 其他原有样式保持不变 */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1%;
}

.section-title {
    font-size: 18px;
    font-weight: 800;
}
</style>