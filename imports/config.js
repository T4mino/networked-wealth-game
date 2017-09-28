// Config settings that are not game-level
// but can be tweaked programmatically
export default {
  network: {
    largestNodeSize: 50
  },
  groups: {
	gender: {
	  colors: {
		0: "#993399",
		1: "#00cccc"
	  },
	  labels: {
		0: "Male",
		1: "Female"
	  }
	},
	age: {
      labels: {
	    0: "<= 20",
		1: "20 - 25",
		2: ">= 25"
	  }
	}
  },
  player: {
    ownColor: "#ffff14"
  }
};
