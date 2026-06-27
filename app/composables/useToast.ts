type Toast = {
  id: number
  message: string
  duration: number
}

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const show = (message: string, duration = 3000) => {
    const id = Date.now() + Math.random()

    toasts.value.push({
      id,
      message,
      duration,
    })

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  return {
    toasts,
    show,
  }
}
