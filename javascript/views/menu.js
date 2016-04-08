'use strict';

const rp = require('request-promise');

const Cookies = require('js-cookie');

const Surveys = require('./list').Surveys;
const RandomSurveys = require('./list').RandomSurveys;
const QuestionAnswersForm = require('./forms').QuestionAnswersForm;
const Presentation = require('./presentation');

var Menu = React.createClass({
    getInitialState: function() {
        return {
            showList: false,
            showRandom: false,
            hideButtons: Cookies.get('done') === undefined,
            showForm: false,
            showPresentation: Cookies.get('done') === undefined,
            count: 0,
        };
    },

    showList: function() {
        this.setState({showList: true, hideButtons: true});
    },

    showRandom: function() {
        this.setState({showRandom: true, hideButtons: true});
    },

    showForm: function() {
        this.setState({showForm: true, showPresentation: false, hideButtons: true});
    },

    showButtons: function() {
        this.setState({showRandom: false, showForm: false, showList: false, showPresentation: false, hideButtons: false});
    },

    formSubmitted: function() {
        this.setState({showForm: false, hideButtons: false});
    },

    componentDidMount: function() {
        rp(_.merge(routes.surveys.count,{json: true})).then(
            (count) => this.setState({
                count: count.count,
            })
        );
    },

    render: function() {
        return (
            <div>
            {!this.state.hideButtons ?
             <div id="menu">
                 <p>
                     <button type="button" onClick={this.showList} className="btn btn-lg btn-primary" aria-label="Left Align">
         Voir la liste des <strong className="text-success">{this.state.count}</strong> réponses
                     </button>

                     <button type="button" className="btn btn-lg btn-primary" onClick={this.showRandom} aria-label="Left Align">
         Voir les réponses aléatoirement
                     </button>
                     <button type="button" className="btn btn-lg btn-primary" onClick={this.showForm} aria-label="Left Align">
                     Revenir au questionnaire
                     </button>
                     <a className="btn btn-lg btn-primary" aria-label="Left Align" href="/public/pdf/questionnaire-a-la-proust.pdf" download>
                     Télécharger le questionnaire
                     </a>
                 </p>
             </div>
           : null}
            {this.state.showList ? <Surveys showButtons={this.showButtons} /> : null}
            {this.state.showRandom ? <RandomSurveys showButtons={this.showButtons} /> : null}
            {this.state.showPresentation ? <Presentation email={this.props.email} showForm={this.showForm} /> : null}
            {this.state.showForm ? <QuestionAnswersForm formSubmitted={this.formSubmitted} /> : null}
            </div>
        );
    }
});

module.exports = Menu;
