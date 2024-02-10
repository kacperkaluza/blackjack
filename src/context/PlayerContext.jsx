import { createContext } from "react";

const PlayerContext = createContext({ hand: [], points: 0 });

export default PlayerContext;