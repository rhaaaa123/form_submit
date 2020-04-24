<template>
  <el-form ref = "formForm" :model = "formForm" label-width="100px">
    <el-form-item v-for="(item, key) in formItems" :label = "item.label" :prop = "item.prop" :rules = "item.rules" :key = "key">
      <el-input v-if="item.type === 'input'" :class="item.class" v-model="formForm[item.model]" :value="item.defaultValue" :placeholder="item.placeholder"></el-input>
      <el-input v-else-if="item.type === 'textarea'" type = "textarea" :class="item.class" v-model="formForm[item.model]" :value="item.defaultValue" :placeholder="item.placeholder"></el-input>
      <el-select v-else-if="item.type === 'select'" :class="item.class" v-model="formForm[item.model]" :value="item.defaultValue" :placeholder="item.placeholder">
        <el-option-group v-show="item.isGroup" v-for="group in item.options" :key="group.label">
          <el-option v-for="(option,key) in group.options" :value="option.value" :key="key" :label = "option.label"></el-option>
        </el-option-group>
        <el-option v-show="!item.isGroup" v-for="(option,key) in item.options" :value="option.value" :key = "key" :label = "option.label"></el-option>
      </el-select>
      <el-checkbox-group v-else-if="item.type === 'checkbox'" :class="item.class" v-model="formForm[item.model]" :value = "item.defaultValue" :placeholder="item.placeholder">
        <el-checkbox v-for="(checkbox, key) in item.checkboxs" :value="checkbox.value" :key = "key" :label = "checkbox.label"></el-checkbox>
      </el-checkbox-group>
      <el-radio-group v-else-if="item.type === 'radio'" :class="item.class" v-model="formForm[item.model]" :value = "item.defaultValue" :placeholder="item.placeholder">
        <el-radio v-for="(radio, key) in item.radios" :value="radio.value" :key ="key" :label = "radio.label"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button  @click = "onSubmit('formForm')" type = "primary" round>提交</el-button>
      <el-button  @click = "resetForm('formForm')" round>取消</el-button>
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
      rules: [{ required: true, message: '请选择方案标签', trigger: 'change' }]
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
      type: 'checkbox',
      label: '多选框',
      prop: 'solutioncCheck',
      model: 'solutionCheck',
      defaultValue: [],
      class: 'formItemValue',
      placeholder: '请选择',
      checkboxs: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'}
      ],
      rules: [{ type: 'array', required: false, message: '请选择', trigger: 'change' }]
    },
    {
      type: 'radio',
      label: '单选框',
      prop: 'solutioncRadio',
      model: 'solutionRadio',
      defaultValue: '',
      class: 'formItemValue',
      placeholder: '请选择',
      radios: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'}
      ],
      rules: [{required: false, message: '请选择', trigger: 'change' }]
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
  let formContent = {}
  for (let item of fc) {
    if (item.type !== 'button-sub' && item.type !== 'button-reset') {
      formContent[item.model] = item.defaultValue
    }
  }
  return {
    'fType': target,
    'fItems': fc,
    'fForm': formContent
  }
}
let con = getConfig('form1')
console.log(con.fForm)
export default {
  data () {
    return {
      formType: con.fType,
      formForm: con.fForm,
      formItems: con.fItems,
      solution: {}
    }
  },
  methods: {
    query () {
      axios({
        method: 'get',
        url: 'http://localhost:3000'
      }).then((response) => {
        //this.formContent = response.data.data
        console.log(response.data.data)
      })
    },
    onSubmit (formName) {
      
      //console.log(formData)
      //console.log(this.$refs[formName].validate())
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit')
          console.log('提交表单')
          let formData = JSON.stringify(this.formForm)

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
          } else {
            //console.log('error')
            return false
          }
        })
        
      
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
