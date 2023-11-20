import { useContext } from "react"
import { GameStatusContext } from "../context/GameStatusContext"

export const useGameStatus = () => {
  return useContext(GameStatusContext)
}