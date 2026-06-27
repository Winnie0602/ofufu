export function formatTime(seconds: number): string {
  const totalSeconds = Math.floor(seconds)

  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function calcProgress(
  currentTime: number,
  duration: number,
): number {
  if (duration <= 0) return 0
  return Math.min(100, Math.max(0, (currentTime / duration) * 100))
}
