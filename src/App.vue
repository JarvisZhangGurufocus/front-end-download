<template>
  <div>
    <el-menu
      :default-active="null"
      background-color="#195DAA"
      text-color="#FFF"
      active-text-color="#FFD04B">
      <el-menu-item index="-1">
        <a href="https://www.gurufocus.com">
          <img
            src="https://www.gurufocus.com/reader/img/logo_small_new.png"
            alt="GuruFocus"
            title="GuruFocus"
            class="nav-title-img">
        </a>
      </el-menu-item>
    </el-menu>

    <el-card style="width: 50%; height: 50%; margin: 20% auto; min-width: 400px;">
      <div class="message-section">
        <template v-if="message">
          <i class="el-icon-loading"/> {{ message }}
        </template>
        <template v-else>
          {{ task ? task.file_name : 'Finished' }}
          <a
            :download="fileName"
            :href="blobUrl"
            style="float: right; cursor: pointer; color: #409EFF;" >
            Not seen downloaded file ?
            Click Here
          </a>
        </template>
      </div>
      <el-progress
        :text-inside="true"
        :stroke-width="18"
        :percentage="progress"
        :status="progress >= 100 ? 'success' : 'text' "
        :show-text="false"/>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import ApiService from './api/ApiService'
import Cookie from './utils/Cookie'
import TaskHelper from './utils/TaskHelper'
import TaskHandlerFactory from './utils/TaskHandler/TaskHandlerFactory'

export default {
  name: 'app',
  data () {
    return {
      user: null,
      task: null,
      blob: null,
      message: null,
      progress: 0
    }
  },
  watch: {
    'task.loading': function (val) {
      this.message = val
    },
    'task.progress': function (val) {
      this.progress = val
    }
  },
  computed: {
    blobUrl () {
      return this.task && this.task.blob ? URL.createObjectURL(this.task.blob) : null
    },
    fileName () {
      let fileName = this.task ? this.task.file_name : 'download'
      fileName += this.task && this.task.to_csv ? '.csv' : '.xlsx'
      return fileName
    }
  },
  created () {
    this.$api = new ApiService({
      $axios: axios.create({
        baseURL: process.env.VUE_APP_LARAVEL_BROWSER_ENDPOINT
      })
    })
  },
  async mounted () {
    await this.userCheck()
    await this.taskCheck()
    await this.executeTask()
  },
  methods: {
    async userCheck () {
      this.message = 'User Status Check'

      const token = Cookie.get('password_grant_custom.token')
      if (!token) { return this.close() }
      
      this.$api.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      const user = await this.$api.users.getUser().catch(err => { return err })
      if (!user || user.status < 3) { return this.close() }
      
      this.user = user

      console.log(user)
    },
    async taskCheck () {
      this.message = 'Download Validate Check'

      const task = TaskHelper.getServerData()
      if (!task) { return this.close() }
      this.task = task

      console.log(task)
    },
    async executeTask () {
      this.message = 'Preparing Task'

      if (!this.task) { return this.close() }
      const handler = TaskHandlerFactory.getHandler(this, this.task)
      if (!handler) { return this.close() }

      handler.start()

      this.message = this.task.loading
      this.progress = this.task.progress
    },
    close () {
      window.open('', '_self', '')
      window.close()
    }
  }
}
</script>

<style>
  body {
    margin: 0;
  }

  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }

  .message-section {
    font-size: 18px;
    line-height: 30px;
    color: #606266;
  }

  .nav-title-img {
    margin: 5px;
    height:30px;
  }
</style>