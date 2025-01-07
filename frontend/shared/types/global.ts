import type colors from 'vuetify/util/colors'

export type Color = keyof typeof colors

export interface Notification {
  show: boolean
  message: string
  color: Color
  timeout: number
}
