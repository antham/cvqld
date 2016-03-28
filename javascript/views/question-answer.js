'use strict';

var QuestionAnswer = React.createClass({
    getInitialState: function() {
        return {
            full: false
        }
    },

    expand: function() {
        this.setState({
            full: true
        })
    },

    render: function() {
        return (
            <div className="questionAnswer">
                <div className="question"><em>{this.props.question}</em></div>
                <div className="answer" onClick={this.expand}>
            {
                this.state.full ?
                <span>{this.props.answer}</span> :
                <span>{_.truncate(this.props.answer, {'length': 200, 'separator':'&hellip'})} {this.props.answer && this.props.answer.length > 200 ? <a className="expand">(voir la suite)</a> : '' }</span>
            }
                </div>
            </div>
        );
    }
});

module.exports = QuestionAnswer;
