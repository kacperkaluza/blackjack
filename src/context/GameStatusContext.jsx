import { createContext, useState } from "react";

export const GameStatusContext = createContext(["NaN", () => {}]);
// eslint-disable-next-line react/prop-types
export const GameStatusProvider = ({ children }) => {
  const [gameStatus, setGameStatus] = useState("NaN");
  
  return (
    <GameStatusContext.Provider value={[gameStatus, setGameStatus]}>
      {children}
    </GameStatusContext.Provider>
  );
};
