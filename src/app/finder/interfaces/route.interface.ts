import { Fix } from "./fix.interface";

export interface Route {
  path: Fix[],
  direction: Direction
  isEven: boolean
}

export enum Direction {
  BACKWARD = 'B',
  FORWARD = 'F'
}
