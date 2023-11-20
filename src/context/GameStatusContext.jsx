import { createContext, useState } from "react";

export const GameStatusContext = createContext(["NaN", () => {}]);
// eslint-disable-next-line react/prop-types
export const GameStatusProvider = ({ children }) => {
  const [gameStatus, setGameStatus] = useState("NaN");
  const changeGameStatus = (g) => {
    setGameStatus(g);
  };
  return (
    <GameStatusContext.Provider value={[gameStatus, changeGameStatus]}>
      {children}
    </GameStatusContext.Provider>
  );
};
