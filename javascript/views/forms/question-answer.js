'use strict';

var QuestionAnswer = React.createClass({
    edit: function(e) {
        this.props.setAnswer(this.props.rank, e.target.value);
    },

    render: function() {
        return (
            <div className="questionAnswer form-group">
                <label htmlFor={"answer"+this.props.rank} className="question">{this.props.question}</label>
                <textarea id={"answer"+this.props.rank} onChange={this.edit} className="answer form-control"></textarea>
            </div>
        );
    }
});

module.exports = QuestionAnswer;
