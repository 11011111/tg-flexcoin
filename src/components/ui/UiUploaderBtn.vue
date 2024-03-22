<script setup lang="ts">
import { ref, watch } from 'vue'
import { api } from 'boot/axios'
import UiErrorBottom from 'components/ui/UiErrorBottom.vue'
import { useRouter } from 'vue-router'
import { links } from 'src/common/routerLinks'

const props = defineProps({
  requestURL: {
    type: String,
    required: true
  }
})

const router = useRouter()
const fileUpload = ref(null)
const refFileUpload = ref(null)
const loaderUploadFile = ref(false)
const dialogWindow = ref(false)
const errorBadRequest = ref({
  title: 'Bad request',
  desc: 'Sorry, QR code can’t be recognized, please try again',
  img_name: 'error_badRequest.svg'
})

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

    // QRRequest({ method: 'post', params: fileSend })
    api
      .post(props.requestURL, fileSend, {})
      .then((res) => {
        if (res.data.ok) router.push({ name: links.EXCHANGE.name })
      })
      .catch((err) => {
        console.log(err?.response)
        dialogWindow.value = true
        fileUpload.value = null
        loaderUploadFile.value = false
      })
  }
  // console.log(file)
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

UiErrorBottom(
  :title="errorBadRequest.title"
  :desc="errorBadRequest.desc"
  :name-img="errorBadRequest.img_name"
  v-model="dialogWindow"
)
</template>

<style scoped lang="sass">
.modern-dialog
  background: #fff
  border-radius: 10px 10px 0 0
</style>
