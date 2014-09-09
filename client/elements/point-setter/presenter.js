(function() {
	var ENTER_KEY = 13;

	function checkValidScore(points) {
		return isInteger(points) && points >= 0;
	}

	function isInteger(x) {
		return (typeof x === 'number') && (x % 1 === 0);
	}

	Polymer({
		handleSetPoint: function(event, detail, sender) {
			var points = Number(sender.value);
			if (checkValidScore(points)) {
				this.fire('score-setted', {
					points: points
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