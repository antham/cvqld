'use strict';

var rp = require('request-promise');
var Cookies = require('js-cookie');

const QuestionAnswerForm = require('./question-answer');
const UserForm = require('./user');

var QuestionAnswersForm = React.createClass({
    getInitialState: function() {
        return {
            datas:{},
            hide: false,
            error: false,
            disabled: true,
            sending: false
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

        this.setState({
            hide: true,
            sending: true
        });

        rp(_.merge(
            routes.surveys.create,
            {
                json: true,
                body: _.merge(this.state.datas, _.chain(this.state.datas).pickBy(_.isString).mapValues(_.capitalize).value())
            }
        )
        ).then(
            () => {
                this.setState(
                    {
                        error: false,
                        sending: false
                    }
                );
                Cookies.set('done', '1', { expires: 365 });
                this.props.formSubmitted();
            }

        ).catch(
            () => {
                this.setState(
                    {
                        hide: false,
                        error: true,
                        sending: false
                    }
                );

                setTimeout(() => this.setState({error: false}), 2000);
            }
        );
    },

    changeState: function() {
        this.state.disabled = (_.size(this.state.datas) != 9)
    },

    render: function() {
        this.changeState();

        return (
            <div>
            {this.state.sending ? <p className="alert alert-info" role="alert">Questionnaire en cours d'envoi veuillez patienter...</p> : null }
            {!this.state.hide ?
             <form>

                {this.state.error ?
                 <p className="alert alert-danger" role="alert">Impossible d'enregistrer les changements, veuillez recommencer</p> :
                 <p className="alert alert-info" role="alert">Renseignez tous les champs</p>
                }
                 <UserForm key='user' setUser={this.setUser} labels={{firstName: "Votre prénom", age: "Votre âge"}}/>
            {
                questions.map((q, i) =>
                    <QuestionAnswerForm setAnswer={this.setAnswer} key={'questionAnswer' + i } question={q} rank={i+1} />
                )
            }
                    <div>
            {this.state.disabled ? <p className="text-danger"> Renseignez tous les champs</p> : null }
                        <button type="button" onClick={this.send} className="btn btn-primary save" disabled={this.state.disabled}>Enregistrer</button>
                    </div>
             </form>
             : null }
            </div>
        );
    }
});

module.exports = QuestionAnswersForm;
