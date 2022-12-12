import { defineStore } from 'pinia'

import { useEvm } from '@/evm.config'

import { safeRead } from 'evm-ext'
import { useWallet } from 'evm-ext-vue3'

import { BigNumber } from 'ethers'

const { useContracts } = useEvm()

export const useToken = defineStore('token', {
  state: () => ({
    loading: false,
    symbol: 'TKN',
    balance: BigNumber.from(0),
  }),
  actions: {
    async onInit() {
      const { token } = useContracts()
      this.symbol = await safeRead(token.symbol(), 'NO SYMBOL')
      return true
    },
    async onLogin() {
      console.log('on login')
      const { token } = useContracts()
      const { wallet } = useWallet()
      this.balance = await safeRead(token.balanceOf(wallet), BigNumber.from(0))
      return true
    },
  },
})
