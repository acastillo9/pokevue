import { frontImagePokemon, backImagePokemon } from './constants'
import { type Move, type Type, type Stat, type Pokemon } from '@/models/pokemon.model'
import { getMoveInformation, getPokemonInfo, getTypesInformation } from '@/services/api'

export const getImageUrl = (pokemon: string = '', isOnFrontPosition = true) => {
  const positionUri = isOnFrontPosition ? frontImagePokemon : backImagePokemon
  return new URL(`${positionUri}${pokemon}.gif`, import.meta.url).href
}

export const getPokemonTypeUrl = (type: string) => {
  return new URL(`../assets/pokemon-types/${type}.png`, import.meta.url).href
}

// fetch Pokemon

export const getPokemon = async (name: string): Promise<Pokemon> => {
  const { stats, types, ...data } = await getPokemonInfo(name)
  const moves = await getRandomMoves(4)
  const pokemonTypes = getTypesInfo(types)

  const level = Math.floor(Math.random() * 100) + 1 // TODO a random number for now

  const calculateHp = (base: number, level: number, iv: number = 0, ev: number = 0) => {
    return ((2 * base + iv + Math.floor(ev / 4)) * level) / 100 + level + 10
  }

  const calculateStat = (
    base: number,
    level: number,
    iv: number = 1,
    ev: number = 1,
    nature = 1
  ) => {
    return (((2 * base + iv + Math.floor(ev / 4)) * level) / 100 + 5) * nature // TODO add nature
  }

  const getStat = (index: number, calculateFunction = calculateStat) => ({
    base: stats[index].base_stat,
    ev: 0,
    iv: 0, // TODO add individuals values
    max: calculateFunction(stats[index].base_stat, level, 0, 0)
  })

  const hp: Stat = getStat(0, calculateHp)
  hp.current = hp.max

  return {
    id: data.id,
    name: data.name,
    nickname: '',
    level,
    lifePercentage: 100,
    abilities: data.abilities,
    hp,
    atk: getStat(1),
    def: getStat(2),
    spAtk: getStat(3),
    spDef: getStat(4),
    speed: getStat(5),
    moves,
    types: pokemonTypes
  }
}

const getRandomMoves = async (amount: number) => {
  const currentMoves: Move[] = []
  for (let i = 0; i < amount; i++) {
    const random = Math.ceil(Math.random() * 101)
    const move = await getMoveInformation(random)
    currentMoves.push({
      name: move.name,
      power: Number(move.power),
      type: move.type.name,
      description: move.effect_entries[0].short_effect
    })
  }

  return currentMoves
}

type TypeResponse = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type DamageRelations = {
  [name: string]: number
}

enum TypeRelations {
  no_damage_from = 0,
  half_damage_from = 0.5,
  double_damage_from = 2
}

const getTypesInfo = (types: TypeResponse[]) => {
  const currentTypes: Type[] = []
  types.forEach(async ({ type: { name } }) => {
    const typeInfo = await getTypesInformation(name)
    currentTypes.push({
      name: typeInfo.name,
      damageRelations: Object.keys(typeInfo.damage_relations)
        .filter(key => key in TypeRelations)
        .reduce<DamageRelations>((acc, key) => {
          typeInfo.damage_relations[key].forEach((damageRelation) => {
            acc[damageRelation.name] = TypeRelations[key as keyof typeof TypeRelations]
          });
          return acc;
        }, {})
    })
  })
  return currentTypes
}

// Damage calculations

export const getDamage = (attacker: Pokemon, defender: Pokemon, move: Move) => {
  const critical = calculateCritical(1 / 16)
  const typeEffectiveness = calculateTypeEffectiveness(move.type, defender.types)
  return calculateDamage(attacker, defender, move, critical, typeEffectiveness)
}

const calculateTypeEffectiveness = (moveType: string, defenderTypes: Type[]): number => {
  return defenderTypes.reduce((typeEffectiveness, type) => {
    return typeEffectiveness * (type.damageRelations[moveType] || 1)
  }, 1)
}

const calculateDamage = (
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  critical: boolean,
  typeEffectiveness: number
) => {
  const criticalModifier = critical ? 1.5 : 1
  const randomModifier = Math.random() * (1.0 - 0.85) + 0.85 // Random number between 0.85 and 1.0
  // TODO For simplicity, we assume STAB, weather, badge, burn, and other factors as 1.
  const modifier = criticalModifier * randomModifier * typeEffectiveness
  return (
    ((((2 * attacker.level) / 5 + 2) * move.power * (attacker.atk.max / defender.def.max)) / 50 + 2) * modifier
  )
}

const calculateCritical = (criticalHitRatio: number): boolean => {
  // Generate a random number between 0 and 1
  const randomNumber: number = Math.random()

  // If the random number is less than the critical hit ratio, it's a critical hit
  return randomNumber < criticalHitRatio
}
