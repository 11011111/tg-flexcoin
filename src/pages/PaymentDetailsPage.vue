<script setup lang="ts">
import UiTimer from '../components/ui/UiTimer.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { settingsState } from 'stores/settings'
import copyIco from 'src/assets/icons/copy.svg'
import roundDoneIco from 'src/assets/icons/round-done.svg'
import { copyToClipboard } from 'quasar'
import UiConfirm from 'components/ui/Dialogs/UiConfirm.vue'
import { remainingTimeFn } from 'src/common/utils'
import UiTimeout from 'components/ui/Dialogs/UiTimeout.vue'

const imgPath = process.env.DEFAULT_URL_PATH
const currencyNetwork = ref('USDT Tron (TRC 20)')
const { invoice } = storeToRefs(settingsState())
const isCopyRecipientAddress = ref(true)
const isCopyAmount = ref(true)
const isConfirmShow = ref(false)
const isTimeoutShow = ref(false)

onMounted(() => {
  console.log(checkTimer())
  isTimeoutShow.value = checkTimer()
})

const recipientAddress = computed(() => {
  return invoice.value?.pay_to_address
})

const usd_amount = computed(() => {
  return invoice.value?.usd_amount + ' USDT'
})

const date_expire = computed(() => {
  return invoice.value?.date_expire
})

const copyRecipientAddressBtn = () => {
  copyToClipboard(recipientAddress.value)
  isCopyRecipientAddress.value = false

  setTimeout(() => {
    isCopyRecipientAddress.value = true
  }, 1000)
}

const copyAmountBtn = () => {
  copyToClipboard(usd_amount.value.replace(/ USDT/g, ''))
  isCopyAmount.value = false

  setTimeout(() => {
    isCopyAmount.value = true
  }, 1000)
}

watch(date_expire, () => {
  console.log(checkTimer())
  isTimeoutShow.value = checkTimer()
})
function checkTimer() {
  // remainingTimeFn(date_expire.value)
  if (
    remainingTimeFn(date_expire.value) > 0 ||
    remainingTimeFn(date_expire.value)
  ) {
    return false
  } else {
    return true
  }
}
</script>

<template lang="pug">
q-card.q-pa-lg.flex(style="min-height: 100%")
  .row.justify-center.q-px-sm.q-mb-lg
    .row.justify-center
      img(src="~assets/img/bg_payment_details.svg")
    .flex.column.justify-start.content-center
      h1.text-center.q-px-lg.q-mb-sm Payment details
      p.text-pink.q-px-lg Left time to pay —
        | &nbsp;
        UiTimer(:unix-time="date_expire")
    .row.flex.column.full-width
      span.label-text.block Currency and network
      q-select.full-width(
        v-model="currencyNetwork"
        input-class="my"
        hide-dropdown-icon
        readonly
        stack-label
        outlined
      )
        template(v-slot:selected)
          | {{ currencyNetwork }}
          img.q-ml-xs(src="~assets/logos/tether.svg" width="16px" )
      span.caption.text-pink.my-hint By choosing this payment method don’t forget about a commission on your wallet.

    .row.flex.column.full-width.q-mt-sm
      span.label-text.block Recipient's address
      q-input.full-width(
        input-class="ellipsis"
        v-model="recipientAddress"
        readonly
        stack-label
        outlined
      )
        template(v-slot:append)
          .bg-secondary.border-radius-square.input-append-btn(@click="copyRecipientAddressBtn")
            img(:src="isCopyRecipientAddress ? copyIco : roundDoneIco")

    .row.flex.column.full-width.q-mt-sm
      span.label-text.block Amount
      q-input.full-width(
        input-class="ellipsis"
        v-model="usd_amount"
        readonly
        stack-label
        outlined
      )
        template(v-slot:append)
          .bg-secondary.border-radius-square.input-append-btn(@click="copyAmountBtn")
            img(:src="isCopyAmount ? copyIco : roundDoneIco")

      span.caption.text-pink.my-hint Important! You must send the SAME AMOUNT, otherwise, the payment will not be processed.

  .row.justify-center.full-width.q-px-sm.q-mb-lg.content-end
    .col-2.q-px-xs
      q-btn.full-width.btn-style.history(
        :icon="`img:${imgPath}run_time.svg`"
        color="bg"
        size="12px"
        unelevated
        no-caps
      )
    .col-10.q-px-xs
      q-btn.button-text.btn-style.full-width(
        label="Submit"
        color="primary"
        @click="isConfirmShow = true"
        unelevated
        no-caps
      )
UiConfirm(
  title="Please confirm that you have paid by payment details"
  desc="I confirm that I have paid according to the details shown on the screen"
  v-model="isConfirmShow"
)
UiTimeout(
  title="Oops, the time is up, you didn't have time to pay"
  desc="Go back to the main page, scan the QR code and try again"
  media="bg_timeout.svg"
  v-model="isTimeoutShow"
)
</template>

<style lang="sass">
.my-hint
  display: block
  padding: 5px 0 0
.input-append-btn
  padding: 0 9px
</style>
