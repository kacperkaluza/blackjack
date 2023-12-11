import { createContext, useState } from "react";

export const DeckContext = createContext([[],() => {}]);
// eslint-disable-next-line react/prop-types
export const DeckProvider = ({children}) => {
  const [deck, setDeck] = useState([]);
  return(
    <DeckContext.Provider value ={[deck, setDeck]}>
      {children}
    </DeckContext.Provider>
  )
}