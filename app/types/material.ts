export const materialLevels = ['all', 'n5', 'n4', 'n3', 'n2', 'n1'] as const

export type MaterialLevel = (typeof materialLevels)[number]

export type JlptLevel = Exclude<MaterialLevel, 'all'>
