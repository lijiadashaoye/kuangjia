<template>
  <div class="page">
    page1--page1
    <span>全局的依赖注入</span>
    <span>{{ father }}</span>
    <span>{{ provide1 }}</span>
    <span>{{ provide2 }}</span>
    <div class="excel">
      <div>
        <el-button style="margin: 10px" @click="readExcel"
          >读取excel文件</el-button
        >
        <el-table :data="readData" style="width: 100%" v-if="readData.length">
          <el-table-column prop="id" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="name" label="名字"> </el-table-column>
          <el-table-column prop="desc" label="简介"> </el-table-column>
        </el-table>
      </div>
      <div>
        <p style="font-size: 16px; padding: 10px">填写表单并生成exce文件</p>
        <el-form :rules="rules" ref="form" :model="form" label-width="70px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="desc">
            <el-input type="textarea" rows="4" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="writeExcel(1)"
              >插入数据</el-button
            >
            <el-button
              v-show="readData.length > 0"
              type="primary"
              @click="writeExcel(2)"
              >保存为文件</el-button
            >
            <el-button @click="writeExcel(3)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { read, utils, writeFileXLSX } from "xlsx";
/* 尝试读取文件名和解析 utils */
// export function readFile(filename: string, opts?: ParsingOptions): WorkBook;
// /* 尝试解析数据 */
// export function read(data: any, opts?: ParsingOptions): WorkBook;
// /* 试图将工作簿数据写入或下载到文件中 */
// export function writeFile(data: WorkBook, filename: string, opts?: WritingOptions): any;
// /* 试图写入或下载工作簿数据到XLSX文件 */
// export function writeFileXLSX(data: WorkBook, filename: string, opts?: WritingOptions): any;

export default {
  inject: ["father", "provide1", "provide2"],
  data() {
    return {
      range: "A1:C3000",
      readData: [],
      form: {
        name: "",
        desc: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        desc: [{ required: true, message: "请输入简介", trigger: "blur" }],
      },
      excelData: null,
    };
  },
  created() {
    this.$bus.$on("busEmit", (t) => {
      console.log(t);
    });
  },
  methods: {
    // 只读取excel数据
    readExcel() {
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      input.onchange = async (e) => {
        let files = e.path[0].files[0],
          data = await files.arrayBuffer(),
          /* data is an ArrayBuffer */
          workbook = read(data),
          sheetNames = workbook.SheetNames, // 工作表名称集合
          worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet1
        this.readData = [];
        utils.sheet_to_json(worksheet, { range: this.range }).forEach((t) => {
          this.readData.push({
            id: t["序号"],
            name: t["名字"],
            desc: t["简介"],
          });
        });
      };
    },
    // 新增数据并写道excel文件里
    writeExcel(type) {
      if (type === 1) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.readData.push({
              id: this.readData.length + 1,
              name: this.form.name,
              desc: this.form.desc,
            });
            this.$refs.form.resetFields();
          } else {
            this.$message.error("请输入数据！");
            return false;
          }
        });
      } else if (type === 3) {
        this.$refs.form.resetFields();
      } else {
        let ws = utils.json_to_sheet(
            [{ A: "序号", B: "名字", C: "简介" }],
            { skipHeader: true, origin: "A1" } // 输出时不自动添加header，从A1格开始
          ),
          wb = utils.book_new();
        ws["!merges"] = [];
        // 合并单元格
        // let merge = {
        //   s: {
        //     //s为开始
        //     c: 1, //开始列  从0开始
        //     r: 1, //开始取值范围 从0开始
        //   },
        //   e: {
        //     //e结束
        //     c: 3, //结束列
        //     r: this.readData.length, //结束范围
        //   },
        // };

        utils.sheet_add_json(
          ws,
          this.readData.map((s) => ({
            A: s.id,
            B: s.name,
            C: s.desc,
          })),
          // 输出时不自动添加header，从A2格开始
          {
            skipHeader: true,
            origin: `A2`, // origin：数据填充的起始单元格
          }
        );
        utils.book_append_sheet(wb, ws, "Sheet1");
        let date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate(),
          time = date.toTimeString().split(" ")[0].split(":").join(":");
        writeFileXLSX(wb, `${year}-${month}-${day} ${time}.xlsx`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  color: blue;
  span {
    margin: 5px 15px;
    display: inline-block;
  }
}
.excel {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>