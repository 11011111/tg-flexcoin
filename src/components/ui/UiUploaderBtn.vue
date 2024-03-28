<script setup lang="ts">
import { ref, watch } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { links } from 'src/common/routerLinks'
import { settingsState } from 'stores/settings'
import { storeToRefs } from 'pinia'

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

// Инициируется вызов input=file
const clickBtn = () => {
  refFileUpload.value.pickFiles()
}

// CUD файла
watch(fileUpload, (file) => {
  if (file) {
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
      .catch((err) => {
        console.log(err)
        errorDialogBottom.value.isShow = true
        fileUpload.value = null
        loaderUploadFile.value = false
      })
  }
})
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
q-file.hidden(v-model="fileUpload" label="Standard" ref="refFileUpload")
</template>

<style scoped lang="sass">
.modern-dialog
  background: #fff
  border-radius: 10px 10px 0 0
</style>
