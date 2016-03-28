'use strict';

require('./global');

const questions = require('./questions');
const QuestionAnswersForm = require('./views').forms.QuestionAnswersForm;
const Surveys = require('./views').Surveys;


ReactDOM.render(
    // <QuestionAnswersForm questions={questions} />,
    <Surveys questions={questions} />,
    document.getElementById('start')
);
