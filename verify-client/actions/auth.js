import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import uuid from 'uuid';
import { tryToJS } from '../dsl';
import * as constants from '../constants';
import { locale } from 'moment';

const issuer = window.config.CRIIPTO_VERIFY_AUTH0_TOKEN_ISSUER || `https://${window.config.CRIIPTO_VERIFY_AUTH0_DOMAIN}/`;

const createWebAuth = () => new auth0.WebAuth({ // eslint-disable-line no-undef
  domain: window.config.CRIIPTO_VERIFY_AUTH0_DOMAIN,
  clientID: window.config.CRIIPTO_VERIFY_CLIENT_ID,
  overrides: {
    __tenant: issuer.substr(8).split('.')[0],
    __token_issuer: issuer
  }
});

const authorizeOptions = {
  responseType: 'id_token token',
  responseMode: 'form_post',
  redirectUri: `${window.config.BASE_URL}/login`,
  scope: 'openid email',
  audience: window.config.CRIIPTO_VERIFY_AUDIENCE
};

export function login(returnUrl) {
  return (dispatch) => {
    var existingToken = sessionStorage.getItem('criipto-verify:apiToken');
    if (existingToken) {
      const decodedToken = jwtDecode(existingToken);
      if (isExpired(decodedToken)) {
        sessionStorage.removeItem('criipto-verify:apiToken');
        sessionStorage.removeItem('criipto-verify:idToken');
        dispatch({ type: constants.LOGIN_PENDING });
        return;
      }          
      var idToken = sessionStorage.getItem('criipto-verify:apiToken');
      return processTokens(dispatch, existingToken, idToken, returnUrl);
    } else {
      sessionStorage.setItem('criipto-verify-extension:returnTo', returnUrl);

      return new Promise(function(resolve, reject) {
        var webAuth = createWebAuth();
        webAuth.popup.authorize(authorizeOptions, function(err, authResult) {
          if (err) {
            dispatch({ type: constants.LOGIN_FAILED, payload: err });
            reject(err);
          } else if (authResult) {
            const returnTo = popReturnTo();
            return resolve(processTokens(dispatch, authResult.accessToken, authResult.idToken, returnTo));
          } else {
            err = "Neither error or authResult returned by popup.";
            dispatch({ type: constants.LOGIN_FAILED, payload: err });
            reject(err)
          }
        });
      });
    }
  }
}

function isExpired(decodedToken) {
  if (typeof decodedToken.exp === 'undefined') {
    return true;
  }

  const d = new Date(0);
  d.setUTCSeconds(decodedToken.exp);

  return !(d.valueOf() > (new Date().valueOf() + (1000)));
}

export function logout() {
  return (dispatch) => {
    sessionStorage.removeItem('criipto-verify:apiToken');

    if (window.config.FEDERATED_LOGOUT) {
      window.location.href = `https://${window.config.CRIIPTO_VERIFY_AUTH0_DOMAIN}/v2/logout?federated&client_id=${window.config.CRIIPTO_VERIFY_CLIENT_ID}&returnTo=${encodeURIComponent(window.config.BASE_URL)}`;
    } else {
      window.location.href = `https://${window.config.CRIIPTO_VERIFY_AUTH0_DOMAIN}/v2/logout?client_id=${window.config.CRIIPTO_VERIFY_CLIENT_ID}&returnTo=${encodeURIComponent(window.config.BASE_URL)}`;
    }

    dispatch({
      type: constants.LOGOUT_PENDING
    });
  };
}

const processTokens = (dispatch, apiToken, idToken, returnTo) => {
  const decodedToken = jwtDecode(apiToken);
  if (isExpired(decodedToken)) {
    return;
  }

  axios.defaults.headers.common.Authorization = `Bearer ${apiToken}`;

  sessionStorage.setItem('criipto-verify:apiToken', apiToken);
  sessionStorage.setItem('criipto-verify:idToken', idToken);

  dispatch({
    type: constants.LOADED_TOKEN,
    payload: {
      token: apiToken
    }
  });

  dispatch({
    type: constants.LOGIN_SUCCESS,
    payload: {
      token: apiToken,
      decodedToken,
      user: decodedToken,
      returnTo
    }
  });

  if (returnTo) {
    dispatch(push(returnTo));
  }
};

const popReturnTo = () => {
  const returnTo = sessionStorage.getItem('criipto-verify-extension:returnTo');
  sessionStorage.removeItem('criipto-verify-extension:returnTo');
  return returnTo;
};

export function loadCredentials() {
  return (dispatch, getState) => {
    var state = getState();
    if (state.auth.get('renewingAuthentication')) {
      return;
    }

    const accessToken = sessionStorage.getItem('criipto-verify:apiToken');
    if (accessToken || window.location.hash) {
      if (window.location.hash) {
        dispatch({
          type: constants.LOGIN_PENDING
        });

        var webAuth = createWebAuth();
        if (window.opener) {
          // popup mode (most likely, at least), tell the popup to notify
          // opener window and close itself
          webAuth.popup.callback();
          return;
        } else {
          return webAuth.parseHash({
            hash: window.location.hash
          }, (err, hash) => {
            if (err || !hash || !hash.accessToken) {
              /* Must have had hash, but didn't get an idToken in the hash */
              console.error('login error: ', err);;
              return dispatch({
                type: constants.LOGIN_FAILED,
                payload: {
                  error: err && err.error ? `${err.error}: ${err.errorDescription}` : 'UnknownError: Unknown Error'
                }
              });
            }

            const returnTo = popReturnTo();
            return processTokens(dispatch, hash.accessToken, hash.idToken, returnTo);
          });
        }

        /* There was no hash, so use the token from storage */
        var idToken = sessionStorage.getItem('criipto-verify:idToken');
        return processTokens(dispatch, accessToken, idToken);
      }
  }
  };
}