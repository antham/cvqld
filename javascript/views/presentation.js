
'use strict';

var rp = require('request-promise');

const Surveys = require('./list').Surveys;
const RandomSurveys = require('./list').RandomSurveys;
const QuestionAnswersForm = require('./forms').QuestionAnswersForm;
const Stat = require('./single').Stat;

var Presentation = React.createClass({
    getInitialState: function() {
        return {
            showList: false,
            showRandom: false,
            hideButtons: false,
            showForm: false,
            showStat: false,
            showPresentation: true,
            count: 0
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

    showStat: function() {
        this.setState({showStat: true, hideButtons: true});
    },

    showButtons: function() {
        this.getCount();

        this.setState({showRandom: false, showStat: false, showForm: false, showList: false, showPresentation: false, hideButtons: false});
    },

    formSubmitted: function() {
        this.setState({showForm: false, hideButtons: false, firstVisit: false, count: this.state.count + 1});
    },

    getCount: function() {
        rp(_.merge(routes.surveys.count,{json: true})).then(
            (count) => this.setState({
                count: count.count,
            })
        );
    },

    componentDidMount : function() {
        this.getCount();
    },

    render: function() {
        return (
            <div>
            {!this.state.hideButtons ?
             <div className="well presentation">
                 <p>Ceci n'est pas un test de personnalité. Plus que les réponses elles-mêmes, ce sont les différentes interprétations des questions qui m'intéressent.</p>
                 <p>Plus il y aura de réponses, plus on pourra en extraire des "tendances", sous forme de graphiques et de commentaires réfléchis.</p>
                 <p>Les cent vingt premières réponses furent glanées autour de moi, notamment dans quelques bars nantais sous forme de questionnaires papiers à remplir sur place. Merci donc au Big Ben, au Mon Soleil, à Livresse et au Rouge Mécanique pour leur aide</p>
                 <p>Vous aussi, transformez votre bar préféré en café philo ! Il suffit d'imprimer <a href="/public/pdf/questionnaire.pdf" download>ce questionnaire</a>, de le laisser à disposition des autres clients et de renvoyer les exemplaires scannés remplis, à cette adresse : <strong>{this.props.email}</strong>, pour qu'ils soient intégrés avec les autres.</p>
                 <div className="text-center menu">
                  <button className="btn btn-primary" type="button" onClick={this.showList}>Voir la liste des <strong className="text-success">{this.state.count}</strong> réponses</button>
                  <button className="btn btn-primary" type="button" onClick={this.showRandom}>Voir les réponses au hasard</button>
                  <button className="btn btn-primary" type="button" onClick={this.showForm}>Répondre au questionnaire</button>
                  <button className="btn btn-danger" type="button" onClick={this.showStat}>C'est nous qui le disons</button>
                 </div>
             </div>
             : null}
            {this.state.showList ? <Surveys showButtons={this.showButtons} /> : null}
            {this.state.showRandom ? <RandomSurveys showButtons={this.showButtons} /> : null}
            {this.state.showForm ? <QuestionAnswersForm formSubmitted={this.formSubmitted} /> : null}
            {this.state.showStat ? <Stat showButtons={this.showButtons} /> : null}
            </div>
        );
}
});

module.exports = Presentation;
