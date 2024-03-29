<script setup lang="ts">
import { ref, watch } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { links } from 'src/common/routerLinks'
import { settingsState } from 'stores/settings'
import { storeToRefs } from 'pinia'
// import { QrcodeCapture } from 'vue-qrcode-reader'

const props = defineProps({
  requestURL: {
    type: String,
    required: true
  }
})
const { qrContent, errorDialogBottom } = storeToRefs(settingsState())
const router = useRouter()
const fileUpload = ref(null)
const refFileUpload = ref(null)
const loaderUploadFile = ref(false)
const tg = window.Telegram.WebApp // init TelegramWebApp
// Инициируется вызов input=file

// CUD файла
watch(fileUpload, (file) => {
  if (file) {
    console.log(file)
    tg.showAlert(file?.size, file?.name, file?.type)
    loaderUploadFile.value = true
    const fileSend = new FormData()
    fileSend.append('file', file)
    api
      .post(props.requestURL, fileSend)
      .then((res) => {
        if (res.data.content) {
          qrContent.value = res.data.content
          router.push({ name: links.EXCHANGE.name })
        }
      })
      .catch(() => {
        fileUpload.value = null
        loaderUploadFile.value = false
      })
  }
})
// const decode = ref('')
// const onDetect = (code) => {
//   decode.value = code[0]?.rawValue
//   loaderUploadFile.value = false
//   console.log(code)
// }
// const onSelectFile = (e) => {
//   loaderUploadFile.value = true
//   e.preventDefault()
// }
const onSelectFile = (e) => {
  e.preventDefault()
}
const clickBtn = () => {
  // refFileUpload.value.$el.click()
  refFileUpload.value.pickFiles()
}
</script>

<template lang="pug">
q-btn.full-width.button-text.btn-style(
  label="Start scanning"
  color="primary"
  @click="clickBtn"
  :loading="loaderUploadFile"
  unelevated
  no-caps
  )
//qrcode-capture(@detect="onDetect" :capture="null" @change="onSelectFile" ref="refFileUpload" style="display: none")
q-file.hidden(v-model="fileUpload" label="Standard" ref="refFileUpload" @change="onSelectFile")
</template>

<style scoped lang="sass">
.modern-dialog
  background: #fff
  border-radius: 10px 10px 0 0
</style>
