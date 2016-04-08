'use strict';

const maxAge = 131;

var User = React.createClass({
    getInitialState: function() {
        return {user: {}};
    },

    edit: function(e) {
        let key = e.target.id;
        let value = _.trim(e.target.value);

        let user = this.state.user;
        user[key] = value;

        this.setState({user: user});
        this.props.setUser(user);
    },

    render: function() {
        return (
            <div className="user">
                <div className="form-group">
                    <label htmlFor="name" className="name">Votre prénom</label>
                    <input id="name" onChange={this.edit} type="text" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="age" className="age">Votre age</label>
                    <select id="age" onChange={this.edit} className="form-control" defaultValue="default">
                        <option disabled value="default">----</option>
                                               {
                                                   _.range(1, maxAge).map
                                                   (
                                                       (value, i) =>
                                                           <option key={'age' + i} value={value}>{value}</option>
                                                   )
                                               }
                    </select>
                </div>
            </div>
        );
    }
});

module.exports = User;
