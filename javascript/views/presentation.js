'use strict';

var rp = require('request-promise');

var Presentation = React.createClass({
    getInitialState: function() {
        return {
            count: 0
        };
    },

    componentDidMount: function() {
        rp(_.merge(routes.surveys.count,{json: true})).then(
            (count) => this.setState({
                count: count.count,
            })
        );
    },

    render: function() {
        return (
            <div className="well presentation">
                <p>Ceci n'est pas un test de personnalité. Plus que les réponses elles-mêmes, ce sont les différentes interprétations des questions qui m'intéressent.</p>
                <p>Plus il y aura de réponses, plus on pourra en extraire des "tendances", sous forme de graphiques et de commentaires réfléchis.</p>
                <p>Les cent vingt premières réponses furent glanées autour de moi, notamment dans quelques bars nantais sous forme de questionnaires papiers à remplir sur place. Merci donc au Big Ben, au Mon Soleil, à Livresse et au Rouge Mécanique pour leur aide</p>
                <p>Si vous désirez faire la même chose près de chez vous, <a href="/public/pdf/questionnaire-a-la-proust.pdf" download>télécharger le formulaire ici</a> et renvoyez les exemplaires remplis à cette adresse : <strong>{this.props.email}</strong>, pour qu'ils soient intégrés avec les autres.</p>
                <div className="text-center">
                    <button className="btn btn-primary" type="button" onClick={this.props.showForm}>Répondre au questionnaire pour voir les <strong className="text-success">{this.state.count}</strong> autres réponses</button>
                </div>
            </div>
        );
    }
});

module.exports = Presentation;
