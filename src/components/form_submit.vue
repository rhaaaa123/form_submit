<template>
  <div id = "form_submit">
    <h1>{{project}}方案提交</h1>
    <form @submit.prevent = "onSubmit">
      <div>
        *方案标题：
        <input type="text" v-model = "solution.title" name="solve_title" placeholder="输入标题">
        <p></p>
      </div>
      <div>
        *创意标签：
        <!--input type="text" name="solve_tag" v-model = "solve.tag" placeholder="tag1;tag2"-->
        <input type="checkbox" id="l_s" value="生命科学" v-model = "solution.tag">
        <label for="l_s">生命科学</label>
        <input type="checkbox" id="m_e" value="材料设备" v-model = "solution.tag">
        <label for="m_e">材料设备</label>
        <input type="checkbox" id="IT" value="IT" v-model = "solution.tag">
        <label for="l_s">IT</label>
        <p></p>
      </div>
      <div>
        *创意方案摘要：
        <textarea v-model = "solution.abs" placeholder="摘要"></textarea>
        <p></p>
      </div>
      <!--div>
        *方案文档
        <input type="file" name="solve.file" @change="getFile($event)">
      </div-->
    <input type="submit" value = "提交" />
    <!--button @click = "query">查询</button-->
    <p></p>
    <div>数据库中的记录：{{formContent}}</div>
    <p></p>
    <div>解码之后为：标题 ({{de_title}})   标签 ({{de_tag}})   摘要 ({{de_abs}})</div>

    </form>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import querystring from 'querystring'
export default {
  name: 'form_submit',
  data () {
    return {
      project: '某一个任务',
      formContent: null,
      de_title: '暂无',
      de_tag: '暂无',
      de_abs: '暂无',
      solution: {
        'title': '',
        'tag': [],
        'abs': ''
      }
    }
  },
  methods: {
    query () {
      axios({//从数据库查找
        method: 'get',
        url: 'http://localhost:3000'
      }).then((response) => {
        this.formContent = response.data.data
        console.log(response.data.data)
      })
    },
    onSubmit () {//提交可编辑的表单
      console.log('提交表单')
      if (this.title === '') {
        alert('请输入标题')
        return false
      }
      if (this.tag === []) {
        alert('请输入标签')
        return false
      }
      if (this.abs === '') {
        alert('请输入摘要')
        return false
      }
      let formData = JSON.stringify(this.solution)
      console.log(formData)
      axios({
        method: 'post',
        url: 'http://localhost:3000',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: formData
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
    }
  }
}
</script>
