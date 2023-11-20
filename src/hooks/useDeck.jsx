import { useContext } from "react";
import { DealerContext } from "../context/DealerContext";

export const useDeck = () => {
  return useContext(DealerContext);
};
