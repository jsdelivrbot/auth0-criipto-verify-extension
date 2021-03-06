import React, { Component, PropTypes } from 'react';
import connectContainer from 'redux-static';
import { Error, Confirm } from 'auth0-extension-ui';

import { userActions } from '../../../actions';

export default connectContainer(class extends Component {
  static stateToProps = (state) => ({
    usernameChange: state.usernameChange,
    settings: state.settings
  });

  static actionsToProps = {
    ...userActions
  }

  static propTypes = {
    cancelUsernameChange: PropTypes.func.isRequired,
    changeUsername: PropTypes.func.isRequired,
    usernameChange: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.usernameChange !== this.props.usernameChange;
  }

  onConfirm = () => {
    this.props.changeUsername(this.refs.user.value, this.refs.username.value);
  }

  renderConnection(connection, userFields) {
    const connectionField = _.find(userFields, field => field.property === 'connection');

    const displayConnection = !connectionField || (_.isBoolean(connectionField.edit) && connectionField.edit === true) || _.isObject(connectionField.edit);

    return displayConnection ? <div className="form-group">
      <label className="col-xs-2 control-label">Connection</label>
      <div className="col-xs-9">
        <input type="text" readOnly="readonly" className="form-control" value={connection} />
      </div>
    </div> : <div></div>;
  }

  render() {
    const { cancelUsernameChange } = this.props;
    const { userId, connection, customField, userNameToChange, userName, error, requesting, loading } = this.props.usernameChange.toJS();

    if (!requesting) {
      return null;
    }

    const defaultUsernameValue = customField ? customField.display(customField.user) : userNameToChange;

    const userFields = _.get(this.props.settings.toJS(), 'record.settings.userFields', []);

    return (
      <Confirm title="Change Username?" show={requesting} loading={loading} onCancel={cancelUsernameChange} onConfirm={this.onConfirm}>
        <Error message={error} />
        <p>
          Do you really want to change the username for <strong>{userName}</strong>?
        </p>
        <div className="row">
          <form className="form-horizontal col-xs-12" style={{ marginTop: '40px' }}>
            { this.renderConnection(connection, userFields) }
            <div className="form-group">
              <label className="col-xs-2 control-label">Username</label>
              <div className="col-xs-9">
                <input ref="username" type="text" className="form-control" defaultValue={defaultUsernameValue} />
              </div>
            </div>
            <input ref="user" type="hidden" readOnly="readonly" className="form-control" value={userId} />
          </form>
        </div>
      </Confirm>
    );
  }
});
