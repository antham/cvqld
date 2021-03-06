'use strict';

var rp = require('request-promise');

const Survey = require('./survey');

var Surveys = React.createClass({
    getInitialState: function () {
        return {
            surveys: [],
            loaded: false
        }
    },

    componentDidMount: function () {
        rp(_.merge(routes.surveys.list, { json: true })).then(
            (surveys) => this.setState({
                surveys: surveys,
                loaded: true
            })
        );
    },

    render: function () {
        return (
            <div>
                <ul className="pager">
                    <li className="previous" onClick={this.props.showButtons}><a href="#">← Menu</a></li>
                </ul>
                {!this.state.loaded ?
                    <div className="spinnerWrapper">
                        <div className="sk-bounce">
                            <div className="sk-bounce-dot"></div>
                            <div className="sk-bounce-dot"></div>
                        </div>
                    </div>
                    : null
                }
                <div className="surveys">
                    {this.state.surveys.map((survey, i) =>
                        <Survey key={survey.id} questions={questions} name={survey.name} age={survey.age ? survey.age : ""} answers={[survey.answer1, survey.answer2, survey.answer3, survey.answer4, survey.answer5, survey.answer6, survey.answer7]} messageMaxLength={200} hasLayout={true} />
                    )}
                </div>
            </div>
        )
    }
});

module.exports = Surveys;
