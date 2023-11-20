import { createContext, useState } from "react";

export const DealerContext = createContext([{ hand: [], points: 0 }, () => {}]);
// eslint-disable-next-line react/prop-types
export const DealerProvider = ({ children }) => {
  const [dealer, setDealer] = useState({ hand: [], points: 0 });

  const changeDealer = (d) => {
    setDealer(d);
  };

  return (
    <DealerContext.Provider value={[dealer, changeDealer]}>
      {children}
    </DealerContext.Provider>
  );
};
