'use strict';

const QuestionAnswer = require('./question-answer');
const classnames = require('classnames');

var Survey = React.createClass({
    getInitialState: function() {
        return {
            enableLayout: this.props.hasLayout
        }
    },

    disableLayout: function() {
        this.setState({
            enableLayout: false
        });
    },

    render: function() {
        var surveyClasses = classnames({
            survey: true,
            sumUp: this.state.enableLayout
        });

        return (
            <article className={surveyClasses}>
                <div className="layout" onClick={this.disableLayout}>
                    <div className="name">{this.props.name}</div>
                    <div className="age">{this.props.age != -1 ? this.props.age + ' ans' : ''}</div>
                    <div className="btn btn-link">Cliquez sur la carte</div>
                </div>
                <div className="user">
                    <span className="name">{this.props.name} </span>
                    <span className="age">{this.props.age != -1 ? '(' + this.props.age + ' ans)' :  ''}</span>
                </div>
                {
                    this.props.questions.map((q, i) =>
                        <QuestionAnswer key={'question' + i} questionRank={i+1} question={q} answer={this.props.answers[i]} messageMaxLength={this.props.messageMaxLength}/>
                    )
                }
            </article>
        )
    }
});

module.exports = Survey;
