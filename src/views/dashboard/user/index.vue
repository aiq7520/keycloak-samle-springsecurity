<template>
  <div>
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="Username" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column label="Password" width="100" align="center">
        <template slot-scope="{row}">
          {{ row.password }}
        </template>
      </el-table-column>

      <el-table-column label="" width="100" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="remove(scope.row.id)" />
        </template>

      </el-table-column>
    </el-table>
    <el-button type="primary" size="mini" plain @click="centerDialogVisible=true">add</el-button>
    <el-dialog
      title="User Add"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.password" />

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">commit</el-button>
          <el-button @click="centerDialogVisible=false">cancle</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { findAll, remove, add } from '@/api/user'
import { Message } from 'element-ui'

export default {

  data() {
    return {
      list: null, centerDialogVisible: false, form: { username: '', password: '' }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      const user = { username: this.form.username, password: this.form.password }
      add(user).then(response => {
        this.fetchData()
        this.centerDialogVisible = false
        this.form = {}
        Message({
          message: 'save success',
          type: 'success',
          duration: 3 * 1000
        })
      })
    },
    remove(id) {
      remove(id).then(response => {
        this.fetchData()
        Message({
          message: 'success!',
          type: 'success',
          duration: 3 * 1000
        })
      })
    },
    fetchData() {
      findAll().then(response => {
        this.list = response.data
      })
    }
  }
}
</script>
