'use strict'

var Survey = require('./survey');
var rp = require('request-promise');

var RandomSurveys = React.createClass({
    getInitialState: function() {
        return {
            surveys: [],
            index: 0
        }
    },

    componentDidMount: function() {
        rp(_.merge(routes.surveys.list,{json: true})).then(
            (surveys) => this.setState({
                surveys: _.shuffle(surveys)
            })
        );
    },

    next: function() {
        this.setState({
            index: this.state.index+1
        });
    },

    render: function() {
        let survey = this.state.surveys[this.state.index];

        return (
            <div className="randomSurveys">
            {this.state.surveys.length != 0 ?
             <div>
                 <button type="button" onClick={this.next} className="btn btn-large">Récupérer une carte au hasard</button>
                 <Survey questions={questions} name={survey.name} age={survey.age ? survey.age : ""} answers={[survey.answer1, survey.answer2, survey.answer3, survey.answer4, survey.answer5, survey.answer6, survey.answer7]} />
             </div>
             : null}
            </div>
        )
    }
});

module.exports = RandomSurveys;
