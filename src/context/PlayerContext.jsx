import { createContext, useState } from "react";
import { DealerContext } from "./DealerContext";

export const PlayerContext = createContext([{ hand: [], points: 0 }, () => {}]);
// eslint-disable-next-line react/prop-types
export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({ hand: [], points: 0 });

  

  return (
    <DealerContext.Provider value={[player, setPlayer]}>
      {children}
    </DealerContext.Provider>
  );
};
