export function useCheckConfirm() {
  const isModalOpen = useState<boolean>('confirm-open', () => false)
  const title = useState<string>('confirm-title', () => '')
  const content = useState<string>('confirm-content', () => '')
  const type = useState<'ask' | 'noAsk'>('confirm-type', () => 'ask')

  const resolver = useState<((boo: boolean) => void) | null>(
    'confirm-resolver',
    () => null,
  )

  const open = (t: string, c: string, tp: 'ask' | 'noAsk') => {
    title.value = t
    content.value = c
    isModalOpen.value = true
    type.value = tp

    return new Promise<boolean>((resolve) => {
      resolver.value = resolve
    })
  }

  const confirm = () => {
    isModalOpen.value = false
    resolver.value?.(true)
    resolver.value = null
  }

  const cancel = () => {
    isModalOpen.value = false
    resolver.value?.(false)
    resolver.value = null
  }

  return { isModalOpen, title, content, type, open, confirm, cancel }
}
