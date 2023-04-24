import { BaseModel } from 'pocketbase'

export interface User extends BaseModel {
  username: string
  avatar: string
  email: string
}
