'use strict';

var rp = require('request-promise');

const QuestionAnswerForm = require('./question-answer');
const UserForm = require('./user');

var QuestionAnswersForm = React.createClass({
    getInitialState: function() {
        return {
            datas:{},
            error: false,
            disabled: true,
            hide: false
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

    clear: function() {
        this.setState({datas : {}})
    },

    send: function() {
        if (_.size(this.state.datas) != 9) {
            return;
        }

        let datas = this.state.datas;

        this.setState({
            hide: true
        });

        this.clear();

        rp(_.merge(
            routes.surveys.create,
            {
                json: true,
                body: _.merge(datas, _.chain(datas).pickBy(_.isString).mapValues(_.capitalize).value())
            }
        )
        ).then(
            () => {
                this.setState(
                    {
                        error: false,
                        recorded: true,
                        hide: false
                    }
                );

                setTimeout(() => this.setState({recorded: false}), 2000);
            }

        ).catch(
            () =>
                this.setState(
                    {
                        error: true,
                        recorded: false
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
                 {this.state.recorded ?
                  <p className="alert alert-success" role="alert">Questionnaire enregistré</p> : null
                 }
                 {this.state.error ?
                  <p className="alert alert-danger" role="alert">Impossible d'enregistrer les changements, veuillez recommencer</p> : null
                 }
                  <UserForm key='user' setUser={this.setUser} labels={{firstName: "Prénom", age: "Age"}}/>
                                                                     {
                                                                         questions.map((q, i) =>
                                                                             <QuestionAnswerForm setAnswer={this.setAnswer} key={'questionAnswer' + i } question={q} rank={i+1} />
                                                                         )
                                                                     }
                                                                             <div>
                                                                     {this.state.disabled ? <p className="text-danger"> Remplissez tous les champs</p> : null }
                                                                                 <button type="button" onClick={this.send} className="btn btn-primary save" disabled={this.state.disabled}>Ajouter</button>
                                                                             </div>
             </form>
             : null }
            </div>
        );
    }
});

module.exports = QuestionAnswersForm;
