export interface Pokemon {
  id: string
  name: string
  nickname: string
  level: number
  lifePercentage: number
  abilities: Ability[]
  hp: Stat
  atk: Stat
  def: Stat
  spAtk: Stat
  spDef: Stat
  speed: Stat
  moves: Move[]
  types: Type[]
  gender: string
}

export interface Ability {
  name: string
  url: string
}

export interface Stat {
  base: number
  iv: number
  ev: number
  max: number
  current?: number
}

export interface Move {
  description: string
  name: string
  power: number
  type: string
}

export interface Type {
  name: string
  damageRelations: {
    [name: string]: number
  }
}
