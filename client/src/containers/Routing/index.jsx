import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import Homepage from '../../scenes/Homepage';
import RegistrationPage from '../../scenes/RegistrationPage';
import LoginPage from '../../scenes/LoginPage';
import Moving from '../../scenes/Moving';
import NotFound from '../../scenes/NotFound';
import PrivateRoute from '../PrivateRoute';
import { fetchUser } from '../../routines';
import { registrationRequest, loginRequest } from '../Settings/actions';

class Routing extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderLogin = () => (
    <LoginPage
      isAuthorized={this.props.isAuthorized}
      login={this.props.loginRequest}
    />
  );

  renderRegistration = () => (
    <RegistrationPage
      isAuthorized={this.props.isAuthorized}
      register={this.props.registrationRequest}
    />
  );

  render() {
    const { loading } = this.props;

    return loading
      ? <Loader active />
      : (
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/register" render={this.renderRegistration} />
          <Route exact path="/login" render={this.renderLogin} />
          <PrivateRoute exact path="/moving" component={Moving} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      );
  }
}

Routing.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  fetchUser: PropTypes.func.isRequired,
  registrationRequest: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile: { loading, isAuthorized } }) => ({
  loading,
  isAuthorized
});

const mapDispatchToProps = {
  fetchUser,
  registrationRequest,
  loginRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
