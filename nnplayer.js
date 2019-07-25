/*
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

class NNPlayer {
	constructor(brain) {
		if (brain instanceof NeuralNetwork) {
			this.brain = brain.copy();
			this.brain.mutate(mutate);
		} else {
			this.brain = new NeuralNetwork(3*7*6, 25, 7);
			this.brain.setActivationFunction(relu);
		}
		this.score = 0;
		this.gamesPlayed = 0;
	}

	copy() {
		return new NNPlayer(this.brain);
	}
}
