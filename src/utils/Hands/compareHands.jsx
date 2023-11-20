export const compareHands = (a, b) => {
    if (a > 21) {
      return setGameStatus("win");
    } else {
      if (b == a) {
        return setGameStatus("push");
      }
      if (b > a) {
        return setGameStatus("win");
      }
      if (b < a) {
        return setGameStatus("lose");
      }
    }
  };