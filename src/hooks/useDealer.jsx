import { useContext } from "react";
import { DealerContext } from "../context/DealerContext";

export const useDealer = () => {
  console.log(useContext(DealerContext));
  return useContext(DealerContext);
};
