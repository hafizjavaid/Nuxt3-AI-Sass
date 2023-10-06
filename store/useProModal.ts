import { defineStore } from 'pinia'
export const useProModal = defineStore('ProModal', {
    state: () => ({ isOpen: false, }),

    actions: {


        onOpen() {

            this.isOpen = true
        },
        onClose() {

            this.isOpen = false
        }


    },
})