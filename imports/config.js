// Config settings that are not game-level
// but can be tweaked programmatically
export default {
  network: {
    largestNodeSize: 50
  },
  groups: {
	gender: {
	  labels: {
		0: "Female",
		1: "Male",
		2: "Other"
	  },
	  colors: {
		"Female": "#993399",
		"Male": "#00cccc",
		"Other": "#ff3399"
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
