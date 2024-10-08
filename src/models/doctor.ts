interface listTimeItem {
  time: string
  available: boolean
}

export interface IDoctor {
  id: number
  name: string
  experience: string
  workPlace: string
  location: string
  image: string
  listTime: Array<listTimeItem>
}
