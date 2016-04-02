'use strict';

var rp = require('request-promise');

const Survey = require('./survey');

var Surveys = React.createClass({
  getInitialState: function() {
    return {
      surveys: []
    }
  },

  componentDidMount: function() {
    rp(_.merge(routes.surveys.list,{json: true})).then(
      (surveys) => this.setState({
        surveys: surveys
      })
    );
  },

  render: function() {
    return (
                       <div className="surveys">
        {this.state.surveys.map((survey, i) =>
                                                   <Survey key={survey.id} questions={questions} name={survey.name} age={survey.age ? survey.age : ""} answers={[survey.answer1, survey.answer2, survey.answer3, survey.answer4, survey.answer5, survey.answer6, survey.answer7]} />
                               )}
      </div>
    )
}
});

module.exports = Surveys;
