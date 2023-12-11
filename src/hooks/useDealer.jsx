import { useContext } from "react";
import { DealerContext } from "../context/DealerContext";

export const useDealer = () => {
  return useContext(DealerContext);
};
