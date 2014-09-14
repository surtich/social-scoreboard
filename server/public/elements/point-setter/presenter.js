(function() {
	var ENTER_KEY = 13;

	function checkValidScore(points) {
		return isInteger(points) && points >= 0;
	}

	function isInteger(x) {
		return Number(x) === parseInt(x, 10);
	}

	Polymer({
		handleSetPoint: function(event, detail, sender) {
			var points = sender.value;
			if (checkValidScore(points)) {
				this.fire('score-setted', {
					team: this.teamName,
					points: Number(points)
				});
			}
			sender.value = '';
		},
		keypressAction: function(event) {
			if (event.keyCode === ENTER_KEY) {
				this.handleSetPoint.apply(this, arguments);
			}
		}
	});
}());
