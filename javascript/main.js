'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var rxjs = require('rxjs');
var rp = require('request-promise');


var questions = ["Qu'est ce qui différencie l'homme de l'animal ?", "Quelle est la pire mort ?", "Un génie (ou Dieu) vous propose d'exaucer un souhait, que demandez-vous ?", "Quelle est la plus grande cause de malheur sur cette terre ?", "Où réside l'espoir ?", "Quelle est la faute pour laquelle vous avez le plus d'indulgence ?", "Quelle est l'expérience la plus déconcertante de votre vie ? La chose qui vous a le plus marqué."];

var UserForm  = React.createClass({
    getInitialState: function() {
        return {user: {}};
    },

    edit: function(e) {
        let key = e.target.id;
        let value = e.target.value;

        let user = this.state.user;
        user[key] = value;

        this.setState({user: user});
    },

    render: function() {
        return (
            <div className="user">
                <div className="form-group">
                    <label htmlFor="name" className="name form-control">Entrez un pseudonyme, un prénom...</label>
                    <input id="name" onChange={this.edit} type="text"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="age" className="age form-control">Votre age</label>
                    <input id="age" onChange={this.edit} type="text" />
                </div>
            </div>
        );
    }
});

var QuestionAnswerForm = React.createClass({
    render: function() {
        return (
            <div className="questionAnswer form-group">
                <label htmlFor="answer{i}" className="question">{this.props.question}</label>
                <textarea id="answer{i}" className="answer form-control"></textarea>
            </div>
        );
    }
});

var QuestionAnswersForm = React.createClass({
    questionAnswersform: {
        'user': {},
        'answers': []
    },

    addUser: (user) => {
        this.questionAnswers['user'] = user;
    },

    addAnswer: (answer) => {
        this.questionAnswers['user'] = user;
    },

    render: function() {
        return (
            <div>
                <UserForm populateDetails={this.addUser}/>
                {
                    this.props.questions.map((q, i) =>
                        <QuestionAnswerForm key={'questionAnswer' + i } question={q} />
                    )
                }
            </div>
        );
    }
});


var QuestionAnswersFormNew = React.createClass({
    render: function() {
        return (
            <form>
                <QuestionAnswersForm questions={this.props.questions} />
                <div className="row">
                    <button type="submit" className="pull-right btn btn-primary save">Enregistrer</button>
                </div>
            </form>
        );
    }
});

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

var Survey = React.createClass({
    render: function() {
        return (
            <div className="survey">
                <div className="user"><span className="name">{this.props.name}</span> <span className="age">{this.props.age ? '(' + this.props.age + ' ans)' :  ''}</span></div>
                {
                    this.props.questions.map((q, i) =>
                        <QuestionAnswer key={'question' + i} questionRank={i+1} question={q} answer={this.props.answers[i]} />
                    )
                }
            </div>
        )
    }
});

var Surveys = React.createClass({
    render: function() {
        return (
            <div className="surveys">
                    {this.props.surveys.map((s, i) =>
                        <Survey key={s.id} questions={this.props.questions} name={s.name} age={s.age ? s.age : ""} answers={[s.answer1, s.answer2, s.answer3, s.answer4, s.answer5, s.answer6, s.answer7]} />
                     )}
            </div>
        )
    }
});


rp(
    {
        uri: 'http://localhost:9000/surveys',
        json: true
    }
)
.then((surveys) => {
    ReactDOM.render(
        /*<QuestionAnswersFormNew questions={questions} />,*/
        <Surveys questions={questions} surveys={surveys} />,
        document.getElementById('start')
    );
});
