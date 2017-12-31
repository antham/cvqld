'use strict';

var Stat = React.createClass({
    render: function() {
        return (
            <div>
                <ul className="pager">
                    <li className="previous" onClick={this.props.showButtons}><a href="#">← Menu</a></li>
                </ul>
                <div className="stat">
                    <p><em>Ces remarques et commentaires ont été réalisées à partir des 134 premières réponses.</em></p>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Question 2 - {questions[1]}</h3>
                        </div>
                        <div className="panel-body">Les 120 premières réponses ont presque toute été glanées à Nantes. La proximité géographique de l'Océan explique en partie le nombre important de « Noyade ». Deux personnes interrogées dans les Alpes ont par exemple répondu « Mourir sous une avalanche ».</div>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Question 3 - {questions[2]}</h3>
                        </div>
                        <div className="panel-body">
                            <div>69 personnes (plus de 1 sur 2) demandent quelque chose dont elles seules sont bénéficiaires. Parmi eux, 10 demandent de l'argent. Il est intéressant de noter que les deux réponses majoritaires à la question « Quelle est la plus grande cause de malheur sur cette terre ? » sont « l'argent » et « l'individualisme » !</div>
                            <div>28 ont pensé au bonheur de leurs proches ou de tous les humains</div>
                            <div>14 demandent plusieurs voeux</div>
                            <div>6 ne demandent rien</div>
                            <div>5 demandent l'immortalité</div>
                        </div>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Question 4 - {questions[3]}</h3>
                        </div>
                        <div className="panel-body">
                            <div>16 personnes ont répondu « L'argent »</div>
                            <div>14 « L'individualisme ou l'égoïsme »</div>
                            <div>7 « La guerre »</div>
                            <div>5 « Les ou la religion »</div>
                            <div>5 « L'amour »</div>
                        </div>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Question 5 - {questions[4]}</h3>
                        </div>
                        <div className="panel-body">
                            <div>23 personnes répondent « En chacun de nous » ou « En l'homme »</div>
                            <div>14 « Dans l'Amour » ou « Dans le coeur »</div>
                            <div>6  « Dans les enfants »</div>
                            <div>5  « Dans le désespoir » ou « Au fond du trou »</div>
                            <div>4  « En moi »</div>
                            <div>2  « Dans les autres »</div>
                        </div>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Question 7 - {questions[6]}</h3>
                        </div>
                        <div className="panel-body">
                            <div>10 personnes n'ont rien répondu ou répondu « Rien »</div>
                            <div>6 ont répondu « Donner la vie » ou « avoir un enfant »</div>
                            <div>4 « Naître »</div>
                            <div>4 « Ce questionnaire »</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Stat;
