<template>
  <div>
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="room name" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Status" width="200" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.roomStatus | statusFilter">
            {{ row.roomStatus }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="" width="100" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="remove(scope.row.id)" />
          <i class="el-icon-edit-outline" @click="openEditDialog(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="mini" plain @click="open">add</el-button>
    <el-dialog
      title="User Add"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="editClassRoot" label-width="180px">
        <el-form-item label="room status">
          <el-select v-model="editClassRoot.roomStatus">
            <el-option label="staring" value="staring" />
            <el-option label="notStart" value="notStart" />
            <el-option label="finish" value="finish" />
          </el-select>
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
import { findAll, remove, update } from '@/api/class-room'
import { add } from '@/api/class-room'
import { Message } from 'element-ui'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        staring: 'success',
        notStart: 'danger',
        finish: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null, centerDialogVisible: false, editClassRoot: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    openEditDialog(classRoom) {
      this.centerDialogVisible = true
      this.editClassRoot = classRoom
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
    open() {
      const that = this
      this.$prompt('input class romm', 'Class Room Name', {
        confirmButtonText: 'sure',
        cancelButtonText: 'cancle'
      }).then(({ value }) => {
        add({ 'name': value }).then(response => {
          that.fetchData()
          Message({
            message: 'save success',
            type: 'success',
            duration: 3 * 1000
          })
        })
      }).catch(() => {
        Message({
          message: 'cancle',
          type: 'warn',
          duration: 3 * 1000
        })
      })
    },
    onSubmit() {
      console.log(this.editClassRoot)
      update(this.editClassRoot).then(response => {
        this.fetchData()
        this.centerDialogVisible = false
        this.editClassRoot = {}
        Message({
          message: 'save success',
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
