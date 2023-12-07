<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import userStore from '@/stores/user'
let useUserStore = userStore()
// 获取ref值
let passwordRef = ref<HTMLElement | null>()
// 变量
let loginLogo = ref('')
let isShow = ref(true)
let loading = ref(false)
let editPwdLoading = ref(false)
let passwordType = ref('password')
let editPwdTitle = ref('')
let loginForm = ref({
  username: '',
  password: '',
  verificationCode: ''
})
let loginRules = ref({})
let setPassword = ref({
  oldPassword: '',
  newPassword: '',
  repeatPassword: ''
})
let setPwdRules = ref({})
let handleLogin = () => {
  let obj = {
    name: loginForm.value.username,
    password: loginForm.value.password
  }
  useUserStore.userLogin(obj)
}
let showPwd = () => {
  if (passwordType.value) {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  passwordRef.value?.focus()
}
let setPwdSubmit = () => {}
let goLogin = () => {}
let forgotPwdMethod = () => {}
</script>

<template>
  <div class="login-container">
    <div class="login-con">
      <img class="sugon-logo" :src="loginLogo" alt="" />
      <div class="login-wrap">
        <div class="login-img"></div>
        <div v-show="isShow" class="login-info">
          <p class="login-title">登录账户</p>
          <el-form
            class="login-form"
            :model="loginForm"
            :rules="loginRules"
            @keyup.enter.native="handleLogin"
          >
            <el-form-item prop="username">
              <el-input placeholder="请输入用户名" v-model="loginForm.username">
                <template #prefix>
                  <div class="iconfont icon-shanchu"></div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                ref="passwordRef"
                :type="passwordType"
                placeholder="请输入密码"
                v-model="loginForm.password"
              >
                <template #prefix>
                  <div class="iconfont icon-shanchu"></div>
                </template>
                <template #suffix>
                  <el-icon @click="showPwd" class="commonCursor"><View /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
              <el-col :span="16">
                <el-input
                  prefix-icon="el-icon-mobile-phone"
                  placeholder="请输入验证码"
                  v-model="loginForm.verificationCode"
                ></el-input>
              </el-col>
            </el-form-item>
            <div class="forgotPwd" @click="forgotPwdMethod()">忘记密码？</div>
            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin: 18px 0 30px"
              @click.native.prevent="handleLogin"
              >立即登录</el-button
            >
          </el-form>
        </div>
        <div v-show="!isShow" class="login-info">
          <p class="login-title">{{ editPwdTitle }}</p>
          <el-form
            class="login-form"
            :model="setPassword"
            :rules="setPwdRules"
            @keyup.enter.native="setPwdSubmit"
          >
            <el-form-item prop="oldPassword">
              <el-input
                ref="password"
                type="password"
                prefix-icon="el-icon-lock"
                placeholder="请输入旧密码"
                v-model="setPassword.oldPassword"
              ></el-input>
            </el-form-item>
            <el-form-item prop="newPassword">
              <el-input
                ref="password"
                type="password"
                prefix-icon="el-icon-lock"
                placeholder="请输入新密码"
                v-model="setPassword.newPassword"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repeatPassword">
              <el-input
                ref="password"
                type="password"
                prefix-icon="el-icon-lock"
                placeholder="请输入确认新密码"
                v-model="setPassword.repeatPassword"
              ></el-input>
            </el-form-item>
            <div class="btn-wrap">
              <el-button
                :loading="editPwdLoading"
                type="primary"
                style="width: 70px; margin: 18px 0 30px"
                @click.native.prevent="setPwdSubmit"
                >确认</el-button
              >
              <el-button
                :loading="editPwdLoading"
                type="default"
                style="width: 70px; margin: 18px 0 30px"
                @click.native.prevent="goLogin"
                >取消</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.commonCursor {
  cursor: pointer;
}
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 120px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-con {
    height: 100vh;
    background: url('../../assets/images/login/login-bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .sugon-logo {
      margin-left: 80px;
      margin-top: 20px;
      width: 260px;
      height: 32px;
    }
    .login-wrap {
      width: 800px;
      height: 420px;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      .login-img {
        width: 380px;
        height: 100%;
        background: url('../../assets/images/login/login-info-bg.png') no-repeat;
        float: left;
      }
      .login-info {
        width: 420px;
        height: 100%;
        float: left;
        background: #fff;
        position: relative;
        .login-title {
          font-size: 24px;
          font-weight: 600;
          color: #2a2a2b;
          position: absolute;
          white-space: nowrap;
          left: 50%;
          top: 50px;
          letter-spacing: 5px;
          transform: translateX(-50%);
        }
        .btn-wrap {
          text-align: center;

          button:nth-of-type(1) {
            margin-right: 20px !important;
          }
        }
      }
      :deep(.el-input input) {
        color: #606266;
      }
    }
  }
}
.forgotPwd {
  margin-top: 0px;
  cursor: pointer;
  font-weight: 600;
}
</style>
