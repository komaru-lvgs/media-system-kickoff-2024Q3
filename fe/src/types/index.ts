export type Task = {
  id: number
  title: string
  created_at: Date
  updated_at: Date
}
export type CsrfToken = {
  csrf_token: string
}
export type Credential = {
  email: string
  password: string
}

export type Team = {
  department: string
  point: number
  members?: Member[]
}

export type Game = {
  id: number
  initialPoint: number
  url: string
  imagePath: string
  address: number
}

export type Department = {
  name: string
  point: number
}

export type Member = {
  familyName: string
  firstName: string
}

export type TwisterKeyItem = {
  key: string
  img: string
}

export type Mole = {
  time: number
  img: string
  score: number
  holePos: number
}

export type FlashQuestion = {
  questionText: string
  choices: { id: string; label: string }[]
  answer: string
  incorrectImagePath: string
  correctImagePath: string
}

export type MemberFromItem = {
  id: number
  name: string
  from: string
  img1: string
  img2: string
  hint1: string
  hint2: string
}

export type Card = {
  imagePath: string
  address: number
}

export type PlayedGame = {
  game_id: number
}
