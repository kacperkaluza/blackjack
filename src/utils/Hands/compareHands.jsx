export const compareHands = (a, b) => {
  if (a > 21) {
		return "win";
	} else {
		if (b == a) {
			return "push";
		}
		if (b > a) {
			return "win";
		}
		if (b < a) {
			return "lose";
		}
	}
};
