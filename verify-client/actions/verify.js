import axios from "axios";
import * as constants from '../constants';
import _ from 'lodash'; 
import renewAuth from './auth';
import { toJS } from 'immutable';
import {contentType, jsonResp, getPayload, verifyTenantId, withTenantId, verifyDnsName } from '../dsl'

const getScopedClaims = (scopedClaimsLink) => {
    // User may already have onboarded before
    var scopedClaimsRef = scopedClaimsLink.href.replace(
        '{application}', 
        window.btoa(window.config.VERIFY_GAUSS_APP_ID));
    return axios.get(scopedClaimsRef)
        .then(getPayload)
        .then((scopedClaims) => { 
            return scopedClaims.claimScopes; 
        });
}

export function getVerifyTenants() {
    return (dispatch) => { 
        dispatch({
            type: constants.FETCH_VERIFY_TENANTS,
            payload: {
                promise:
                    axios.get(window.config.GAUSS_API_ROOT, jsonResp)
                        .then(getPayload)
                        .then((gaussRoot) => {
                            var scopedClaimsLink = _.find(
                                gaussRoot.linkTemplates, 
                                { 'rel': 'gauss:scoped-user-claims' });
                            if (scopedClaimsLink)
                            {
                                return getScopedClaims(scopedClaimsLink);
                            } 
                            else
                            {
                                // Unknown user
                                return [];
                            }
                        })
            }
        })
    }
};

export function createVerifyTenant(user, verifyLinks, verifyLinkTemplates) {
    var accessRequestLink = _.find(verifyLinks, { 'rel': 'easyid:access-request'});
    var payload = {
        entityIdentifier : constants.GAUSS_ENTITY_ID,
        name: window.config.AUTH0_DOMAIN,
        contactEmail: user.get('email'),
        contactName: user.get('name')
    };
    return (dispatch) => {
        dispatch({
            type: constants.CREATE_VERIFY_TENANT,
            payload: {
                promise:
                    Promise.all([
                        axios.post(
                            accessRequestLink.href, 
                            payload, 
                            {
                                headers: {
                                    'Content-Type' : contentType('access-request')
                                }
                            }),
                            dispatch(renewAuth()),
                            dispatch(getVerifyTenants())
                        ])
            }
        })
    }
};

export function fetchVerifyDomain(verifyTenant, verifyLinkTemplates) {
    return (dispatch) => {
        var verifyDomainResourceTemplate = 
            _.find(verifyLinkTemplates, {'rel' : 'easyid:tenant-domains'});
        var verifyDomainResource = 
            withTenantId(verifyDomainResourceTemplate.href, verifyTenant);
        dispatch({
            type: constants.FETCH_VERIFY_DOMAINS,
            payload: {
                promise:
                    axios.get(verifyDomainResource, jsonResp)
                        .then(getPayload)
            }
        })
    }
};

export function createVerifyDomain(verifyTenant, verifyLinks) {
    var enrollLink = _.find(verifyLinks, { 'rel': 'easyid:enrollment' });
    var cfg = window.config;
    var payload = {
        tenantId: verifyTenantId(verifyTenant),
        entityId : verifyTenant.entityIdentifier,
        domainName: verifyDnsName()
    };
    return (dispatch) => {
        dispatch({
            type: constants.CREATE_VERIFY_DOMAIN,
            payload: {
                promise: 
                    axios.post(
                        enrollLink.href,
                        payload,
                        {
                            headers: {
                                'Content-Type' : contentType('enrollment')
                            }
                        }
                    ).then(getPayload)
            }
        })
    }
};

export function fetchVerifyApplication(verifyDomain) {
    var applicationsLink = _.find(verifyDomain.links, { 'rel': 'easyid:applications' });
    return (dispatch) => {
        dispatch({
            type: constants.FETCH_VERIFY_APPLICATION,
            payload: {
                promise: 
                    axios.get(applicationsLink.href, jsonResp)
            }
        })
    }
};

export function getVerifyLinks() {
    return { 
        type: constants.FETCH_VERIFY_LINKS,
        payload: {
            promise: 
                axios.get(window.config.VERIFY_API_ROOT)
                .then(getPayload)
        }
    }
  };
  