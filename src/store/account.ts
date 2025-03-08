import { defineStore } from 'pinia'

export interface IAccountInfo {
  id: string
  phone: string
  registerTime: string
  memberName: string
  postalCode: string
  address: string
  fax: string
  website: string
}

export const useAccountStore = defineStore(
  'account',
  () => {
    const accountInfo = ref<IAccountInfo>({
      id: '71516',
      phone: '18449111111',
      registerTime: '2021-01-01',
      memberName: '清茶',
      postalCode: '',
      address: '',
      fax: '',
      website: '',
    })

    const setAccountInfo = (val: IAccountInfo) => {
      accountInfo.value = val
    }

    const clearAccountInfo = () => {
      accountInfo.value = {
        ...accountInfo.value,
        memberName: '',
        postalCode: '',
        address: '',
        fax: '',
        website: '',
      }
    }

    return {
      accountInfo,
      setAccountInfo,
      clearAccountInfo,
    }
  },
  {
    persist: true,
  },
)
