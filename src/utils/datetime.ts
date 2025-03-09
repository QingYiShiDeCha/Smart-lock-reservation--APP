import dayjs from 'dayjs'

export function formatDateTime(time: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function formatDate(date: Date, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format)
}
