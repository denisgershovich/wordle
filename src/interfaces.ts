interface Cell {
  id: string,
  guess: string | null,
  igGuessed: boolean,
  isOnGrid: boolean
}

export type { Cell }