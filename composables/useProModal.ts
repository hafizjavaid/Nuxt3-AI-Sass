// export function useProModal() {

//     const isOpen = ref(false)

//     function onOpen() {
//         isOpen.value = true
//         console.log('Modal Open');

//     }
//     function onClose() {
//         isOpen.value = false
//         console.log('Modal Close');

//     }
//     return { isOpen, onClose, onOpen }
// }

// export const useIsOpen = () => useState<boolean>('open', () => false);

// export const useOnOpen = () => {

//     const open = useIsOpen();
//     open.value = true

// }
// export const useOnClose = () => {

//     const open = useIsOpen();
//     open.value = false

// }

export default () => {

    const isOpen = ref(true)

    function onOpen() {
        isOpen.value = true
        console.log('Modal Open');

    }
    function onClose() {
        isOpen.value = false
        console.log('Modal Close');

    }
    function toggle() {
        isOpen.value = !isOpen.value

    }
    watch(isOpen, (m) => {
        console.log(m);
        
    })
    return { isOpen: isOpen.value, onClose, onOpen, toggle }

}