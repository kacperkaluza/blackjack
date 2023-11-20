import { createContext, useState } from "react";

export const DeckContext = createContext([[],() => {}]);
// eslint-disable-next-line react/prop-types
export const DeckProvider = ({children}) => {
  const [deck, setDeck] = useState([]);
  const changeDeck = (d) => {
    setDeck(d);
  }
  return(
    <DeckContext.Provider value ={[deck, changeDeck]}>
      {children}
    </DeckContext.Provider>
  )
}