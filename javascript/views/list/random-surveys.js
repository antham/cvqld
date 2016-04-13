'use strict'

var rp = require('request-promise');

var Survey = require('./survey');

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
        if (this.state.index+1 == this.state.surveys.length) {
            this.state.index = -1;
        }

        this.setState({
            index: this.state.index+1
        });
    },

    render: function() {
        let survey = this.state.surveys[this.state.index];

        return (
            <div>
                <ul className="pager">
                    <li className="previous" onClick={this.props.showButtons}><a href="#">← Menu</a></li>
                </ul>
                <div className="randomSurveys">
            {this.state.surveys.length != 0 ?
             <div>
                 <button type="button" onClick={this.next} className="btn btn-lg btn-primary">Choisir une autre réponse aléatoirement</button>
                 <Survey questions={questions} name={survey.name} age={survey.age ? survey.age : ""} answers={[survey.answer1, survey.answer2, survey.answer3, survey.answer4, survey.answer5, survey.answer6, survey.answer7]}  messageMaxLength={10000} hasLayout={false} />
             </div>
             : null}
                </div>
            </div>
        )
    }
});

module.exports = RandomSurveys;
