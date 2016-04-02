'use strict';

require('./global');

const QuestionAnswersForm = require('./views').forms.QuestionAnswersForm;
const List = require('./views').list;

ReactDOM.render(
    // <QuestionAnswersForm questions={questions} />,
    <List />,
    document.getElementById('start')
);
