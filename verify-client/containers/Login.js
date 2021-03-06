import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { login } from '../actions/auth';
import { LoadingPanel, Confirm, Error } from 'auth0-extension-ui';

class LoginContainer extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    componentWillMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.push(this.props.auth.returnTo || '/');
        } else if (!this.props.auth.isAuthenticating && !this.props.auth.error) {
            this.props.login(this.props.location.query.returnUrl);
        }
    }

    login() {
        this.props.login(this.props.location.query.returnUrl);
    }

    render() {

        if (this.props.auth.error) {
            return (
                <div className="row">
                    <Confirm
                        dialogClassName="login-error"
                        confirmMessage="Login"
                        loading={false}
                        title="Login Error"
                        show={this.props.auth.error}
                        onConfirm={this.login.bind(this)}
                    >
                        <Error show={true} message={this.props.auth.error} />
                    </Confirm>
                </div>
            );
        }

        if (!this.props.auth.isAuthenticating) {
            return <div></div>;
        }

        return (
            <div className="row">
                <div className="col-xs-12 wrapper">
                    <LoadingPanel />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.toJS()
    };
}

export default connect(mapStateToProps, { login, push })(LoginContainer);
