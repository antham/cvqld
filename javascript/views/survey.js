'use strict';

const QuestionAnswer = require('./question-answer');

var Survey = React.createClass({
    render: function() {
        return (
            <article className="survey">
                <div className="user"><span className="name">{this.props.name}</span> <span className="age">{this.props.age ? '(' + this.props.age + ' ans)' :  ''}</span></div>
                {
                    this.props.questions.map((q, i) =>
                        <QuestionAnswer key={'question' + i} questionRank={i+1} question={q} answer={this.props.answers[i]} />
                    )
                }
            </article>
        )
    }
});

module.exports = Survey;
