'used strict';

var Surveys = require('./surveys');
var RandomSurveys = require('./random-surveys');

var List = React.createClass({
    getInitialState: function() {
        return {
            showList: false,
            showRandom: false,
            hideButtons: false
        };
    },

    showList: function() {
        this.setState({showList: true, hideButtons: true});
    },

    showRandom: function() {
        this.setState({showRandom: true, hideButtons: true});
    },

    render: function() {
        return (
            <div>
            {!this.state.hideButtons ?
             <div id="menu">
                 <h2>Choisissez un mode pour accéder aux réponses des autres visiteurs</h2>
                 <p>
                     <button type="button" onClick={this.showList} className="btn btn-lg" aria-label="Left Align">
                         Voir la liste de toutes les réponses
                     </button>

                     <button type="button" className="btn btn-lg" onClick={this.showRandom} aria-label="Left Align">
                Choisir au hasard une réponse d'un utilisateur
                     </button>
                 </p>
             </div>
             : null}
                {this.state.showList ? <Surveys /> : null}
                {this.state.showRandom ? <RandomSurveys /> : null}
            </div>
        );
    }
});

module.exports = List;
