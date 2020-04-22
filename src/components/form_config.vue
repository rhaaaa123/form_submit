<template>
  <el-form ref = "form" :model = "form" label-width="100px">
    <el-form-item v-for="(item, key) in formItems" :label = "item.label" :prop = "item.prop" :rules = "item.rules" :key = "key">
      <el-input v-if="item.type === 'input'" :class="item.class" v-model="form[item.model]" :value="item.defaultValue" :placeholder="item.placeholder"></el-input>
      <el-input v-if="item.type === 'textarea'" :class="item.class" v-model="form[item.model]" :value="item.defaultValue" :placeholder="item.placeholder"></el-input>
      <el-select v-else-if="item.type === 'select'" :class="item.class" v-model="form[item.model]" :value="item.defaultValue" :placeholder="item.placeholder">
        <el-option-group v-show="item.isGroup" v-for="group in item.options" :key="group.label">
          <el-option v-for="(option,key) in group.options" :value="option.value" :key="key" :label = "option.label"></el-option>
        </el-option-group>
        <el-option v-show="!item.isGroup" v-for="(option,key) in item.options" :value="option.value" :key = "key" :label = "option.label"></el-option>
      </el-select>
      <el-upload v-else-if="item.type === 'upload'" ref = "upload" :action="item.doUpload" :file-list="item.fileList">
        <el-button slot="trigger" size="small" type = "primary">选择文件</el-button>
        <el-button style="margin-left: 10px;" size = "small" type = "success" @click="submitUpload">上传至服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传.docx/.doc/.pdf文件</div>
      </el-upload>

      <el-button v-else-if="item.type === 'button'" @click = "item.action" type = "item.typet">{{item.text}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/javascript">
import axios from 'axios'
import querystring from 'querystring'
const formConfig = {
  form1: [
    {
      type: 'input',
      label: '方案标题',
      prop: 'solutionName',
      model: 'solutionName',
      defaultValue: '',
      class: 'formItemValue',
      placeholder: '请输入方案标题',
      rules: [{required: true, message: '请输入标题', trigger: 'blur'}, {max: 50, message: '最大50个字符', trigger: 'blur'}]
    },
    {
      type: 'select',
      label: '方案标签：',
      prop: 'solutionTag',
      model: 'solutionTag',
      defaultValue: '',
      class: 'formItemValue',
      placeholder: '请选择方案标签',
      options: [
        {label: '标签1', value: '1'},
        {label: '标签2', value: '2'},
        {label: '标签3', value: '3'}
      ],
      rules: [{ required: true, message: '请选择选择器', trigger: 'change' }]
    },
    {
      type: 'textarea',
      label: '方案摘要',
      prop: 'solutionAbs',
      model: 'solutionAbs',
      defaultValue: '',
      class: 'formItemValue',
      placeholder: '请输入方案摘要',
      rules: [{required: true, message: '请输入摘要', trigger: 'blur'}, {max: 600, message: '最大600个字符', trigger: 'blur'}]
    },
    {
      type: 'textarea',
      label: '颠覆性描述',
      prop: 'solutionDes',
      model: 'solutionDes',
      defaultValue: '',
      class: 'formItemValue',
      placeholder: '请输入方案颠覆性',
      rules: [{required: true, message: '请输入方案颠覆性', trigger: 'blur'}]
    },
    {
      type: 'upload',
      label: '导入文件',
      model: 'filePath',
      doUpload: 'http://localhost/8080',
      defaultValue: '',
      fileList: []
    },
    {
      type: 'button',
      action: 'onSubmit',
      text: '提交',
      typet: 'primary'
    },
    {
      type: 'button',
      action: 'resetForm',
      text: '取消'
    }
  ]
}

function getConfig (target) {
  let fc
  switch (target) {
    case 'form1':
      fc = formConfig.form1
      break
    case 'form2':
      fc = formConfig.form2
      break
  }
  let form = {}
  for (let item of fc) {
    form[item.model] = item.defaultValue
  }
  return {
    'formType': target,
    'formItems': fc,
    'form': form
  }
}
let con = getConfig('form1')
console.log(con.form)
export default {
  name: 'form_submit',
  data () {
    return {
      formType: '',
      form: con.form
    }
  },
  methods: {
    query () {
      axios({
        method: 'get',
        url: 'http://localhost:3000'
      }).then((response) => {
        this.formContent = response.data.data
        console.log(response.data.data)
      })
    },
    getFile (event) {
      this.solution.files = event.target.files[0]
      console.log(this.files)
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    onSubmit (event) {
      console.log('提交表单')
      let formData = JSON.stringify(this.form)
      console.log(formData)
      axios({
        method: 'post',
        url: 'http://localhost:3000',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: {
          Content: formData,
          Type: this.formType
        }
      })
        .then((response) => {
          this.formContent = response.data.data
          let deContect = querystring.parse(response.data.data.content)
          this.de_title = deContect.title
          this.de_tag = deContect.tag
          this.de_abs = deContect.abs
          console.log(response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    resetForm (event) {
      this.refs.resetFields()
    }
  }
}
</script>
