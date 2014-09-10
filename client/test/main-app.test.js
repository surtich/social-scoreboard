var assert = chai.assert;
describe('<main-app-element>', function() {
	before(function(done) {
		var l = document.createElement('link');
		l.rel = 'import';
		l.href = 'base/elements/main-app.html';
		document.head.appendChild(l);
		l.onload = function() {
			done();
		};
	});

	it('create one scoreboard', function() {
		var app = document.createElement('main-app');
		app.handleCreateScore();
		assert.equal(app.model.scores.length, 1);
	});

	it('create one scoreboard', function() {
		var app = document.createElement('main-app');
		app.$.menu.shadowRoot.querySelector('#menu').querySelector('#createScoreMenuItem').fire('click');
		assert.equal(app.model.scores.length, 1);
	});

	it.skip('create one scoreboard', function(done) {
		var app = document.createElement('main-app');
		app.handleCreateScore();
		setTimeout(function() {
			console.log(app.$['scoreboard-container'].querySelector('score-board-view').$.home.$.controls.shadowRoot.querySelector('point-button[points="+1"]').$.button.fire('tap'));
			setTimeout(function() {
				assert.equal(app.model.scores.length, 1);
				done();
			}, 500);
		}, 500);
	});
});
