import { IDoctor } from './doctor'

export interface responseModal {
  status: string
  message: string
  data: any
  error_message: string
}

interface listDoctor {
  totalPages: number
  totalItems: number
  currentPage: number
  first: boolean
  last: boolean
  pageItemSize: number
  pageSize: number
  items: Array<IDoctor>
}

export interface listAllDoctorsResponse {
  status: string
  message: string
  data: listDoctor
  error_message: string
}
