'use strict';

var rp = require('request-promise');

const baseURL = 'http://localhost:9000';

const QuestionAnswerForm = require('./question-answer');
const UserForm = require('./user');

var QuestionAnswers = React.createClass({
    getInitialState: function() {
        return {
            datas:{},
            style:{
                display:'block'
            },
            disabled: true
        };
    },

    setUser: function (user) {
        let datas = this.state.datas;
        console.log(user);
        if (!user['age']) {
            _.unset(datas, 'age')
        } else {
            datas['age'] = parseInt(user['age']);
        }

        if (!user['name'] || !user['name'].length) {
            _.unset(datas, 'name')
        } else {
            datas['name'] = user['name'];
        }

        this.setState({datas: datas});
    },

    setAnswer: function (index, answer) {
        let datas = this.state.datas;
        let key = 'answer' + index;

        if (!answer || !answer.length) {
            _.unset(datas, key)
        } else {
            datas[key] = answer;
        }

        this.setState({datas: datas});
    },

    send: function() {
        if (_.size(this.state.datas) != 9) {
            return;
        }

        rp(_.merge(
            routes.surveys.create,
            {
                json: true,
                body: this.state.datas
            }
        )
        ).then(
            () => this.setState(
                {
                    style: {display:'none'}
                })
        )
             .catch(

             );
    },

    changeState: function() {
        this.state.disabled = (_.size(this.state.datas) != 9)
    },

    render: function() {
        this.changeState();

        return (
            <div style={this.state.style}>
                <form>
                    <div>
                    </div>
                    <UserForm key='user' setUser={this.setUser}/>
            {
                this.props.questions.map((q, i) =>
                    <QuestionAnswerForm setAnswer={this.setAnswer} key={'questionAnswer' + i } question={q} rank={i+1} />
                )
            }
                    <div>
            {this.state.disabled ? <p className="text-danger"> Renseignez tous les champs pour accéder aux réponses des autres personnes</p> : null }
                        <button type="button" onClick={this.send} className="btn btn-primary save" disabled={this.state.disabled}>Accédez aux réponses des autres personnes</button>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = QuestionAnswers;
