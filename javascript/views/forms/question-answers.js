'use strict';

var rp = require('request-promise');
var Cookies = require('js-cookie');

const baseURL = 'http://localhost:9000';

const QuestionAnswerForm = require('./question-answer');
const UserForm = require('./user');

var QuestionAnswersForm = React.createClass({
    getInitialState: function() {
        return {
            datas:{},
            hide: false,
            error: false,
            disabled: true
        };
    },

    setUser: function (user) {
        let datas = this.state.datas;

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
            () => {
                this.setState(
                    {
                        hide: true,
                        error: false
                    }
                );
                Cookies.set('done', '1', { expires: 365 });
                this.props.formSubmitted();
            }

        ).catch(
            () =>
                this.setState(
                    {
                        error: true
                    }
                )
        );
    },

    changeState: function() {
        this.state.disabled = (_.size(this.state.datas) != 9)
    },

    render: function() {
        this.changeState();

        return (
            <div>
            {!this.state.hide ?
             <form>

                 {this.state.error ?
                  <p className="alert alert-danger" role="alert">Impossible d'enregistrer les changements, veuillez recommencer</p> :
                  <p className="alert alert-info" role="alert">Renseignez tous les champs pour accédez aux réponses des autres personnes</p>
                 }
                  <UserForm key='user' setUser={this.setUser}/>
            {
                questions.map((q, i) =>
                    <QuestionAnswerForm setAnswer={this.setAnswer} key={'questionAnswer' + i } question={q} rank={i+1} />
                )
            }
                    <div>
                {this.state.disabled ? <p className="text-danger"> Renseignez tous les champs pour accéder aux réponses des autres personnes</p> : null }
                        <button type="button" onClick={this.send} className="btn btn-primary save" disabled={this.state.disabled}>Accédez aux réponses des autres personnes</button>
                    </div>
             </form>
             : null }
            </div>
        );
    }
});

module.exports = QuestionAnswersForm;
