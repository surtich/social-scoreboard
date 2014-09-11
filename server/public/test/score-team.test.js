var assert = chai.assert;
describe('<score-team-element>', function () {
    before(function(done) {
        var l = document.createElement('link');
        l.rel = 'import';
        l.href = 'base/elements/score-team.html';
        document.head.appendChild(l);
        l.onload = function() {
          done();
        };
    });

    it.skip('create one scoreboard', function () {
        var scoreTeam = document.createElement('score-team');
				scoreTeam.bindProperty('teamScore',10, function() {});
				scoreTeam.$.controls.shadowRoot.querySelector('point-button[points="+1"]').$.button.fire('tap');
        assert.equal(scoreTeam.teamScore, 11);
    });
});
