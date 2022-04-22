<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-row :gutter="8">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
          <class-room />
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
          <user />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ClassRoom from './classroom'
import User from './user'
export default {
  name: 'Dashboard',
  components: {
    ClassRoom, User
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
