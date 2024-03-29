// Преобразуем Unix Timestamp в миллисекунды и вычтем текущее время
export const remainingTimeFn = (unixTime: number) => {
  return Math.floor((unixTime * 1000 - Date.now()) / 1000)
}
