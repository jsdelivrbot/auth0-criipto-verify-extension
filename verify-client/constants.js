/*
 * Auth.
 */

// Token.
export const LOADED_TOKEN = 'LOADED_TOKEN';
export const RECIEVED_TOKEN = 'RECIEVED_TOKEN';

// Login.
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const REDIRECT_LOGIN = 'REDIRECT_LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const RENEW_LOGIN = 'RENEW_LOGIN';

// Logout.
export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

/*
 * Connections.
 */

// Fetch.
export const FETCH_CONNECTIONS = 'FETCH_CONNECTIONS';
export const FETCH_CONNECTIONS_PENDING = 'FETCH_CONNECTIONS_PENDING';
export const FETCH_CONNECTIONS_REJECTED = 'FETCH_CONNECTIONS_REJECTED';
export const FETCH_CONNECTIONS_FULFILLED = 'FETCH_CONNECTIONS_FULFILLED';

// Upddate
export const UPDATE_CONNECTION = 'UPDATE_CONNECTION';
export const UPDATE_CONNECTION_PENDING = 'UPDATE_CONNECTION_PENDING';
export const UPDATE_CONNECTION_REJECTED = 'UPDATE_CONNECTION_REJECTED';
export const UPDATE_CONNECTION_FULFILLED = 'UPDATE_CONNECTION_FULFILLED';

/*
 * Clients.
 */

 // Fetch
export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const FETCH_CLIENTS_PENDING = 'FETCH_CLIENTS_PENDING';
export const FETCH_CLIENTS_REJECTED = 'FETCH_CLIENTS_REJECTED';
export const FETCH_CLIENTS_FULFILLED = 'FETCH_CLIENTS_FULFILLED';
  
/*
 * Criipto Verify 
 */

export const GAUSS_ENTITY_ID = window.config.GAUSS_ENTITY_ID;

export const VERIFY_TENANT_ID_PREFIX = 'urn:grn:easyid:tenant:';

// Fetch tenants (from Gauss)
export const FETCH_VERIFY_TENANTS = "FETCH_VERIFY_TENANTS";
export const FETCH_VERIFY_TENANTS_PENDING = 'FETCH_VERIFY_TENANTS_PENDING';
export const FETCH_VERIFY_TENANTS_REJECTED = 'FETCH_VERIFY_TENANTS_REJECTED';
export const FETCH_VERIFY_TENANTS_FULFILLED = 'FETCH_VERIFY_TENANTS_FULFILLED';

// Fetch the Gauss tenants that are also registered in Verify
export const FETCH_REGISTERED_TENANTS_FULFILLED = "FETCH_REGISTERED_TENANTS_FULFILLED";

// Check if we can use the 'default' (calculated from the Auth0 tenant domain) DNS domain
export const CHECK_VERIFY_DOMAIN_AVAILABLE = "CHECK_VERIFY_DOMAIN_AVAILABLE";
export const CHECK_VERIFY_DOMAIN_AVAILABLE_PENDING = 'CHECK_VERIFY_DOMAIN_AVAILABLE_PENDING';
export const CHECK_VERIFY_DOMAIN_AVAILABLE_REJECTED = 'CHECK_VERIFY_DOMAIN_AVAILABLE_REJECTED';
export const CHECK_VERIFY_DOMAIN_AVAILABLE_FULFILLED = 'CHECK_VERIFY_DOMAIN_AVAILABLE_FULFILLED';

// Fetch links
export const FETCH_VERIFY_LINKS = "FETCH_VERIFY_LINKS";
export const FETCH_VERIFY_LINKS_PENDING = 'FETCH_VERIFY_LINKS_PENDING';
export const FETCH_VERIFY_LINKS_REJECTED = 'FETCH_VERIFY_LINKS_REJECTED';
export const FETCH_VERIFY_LINKS_FULFILLED = 'FETCH_VERIFY_LINKS_FULFILLED';

// Fetch domain
export const FETCH_VERIFY_DOMAINS = "FETCH_VERIFY_DOMAINS";
export const FETCH_VERIFY_DOMAINS_PENDING = 'FETCH_VERIFY_DOMAINS_PENDING';
export const FETCH_VERIFY_DOMAINS_REJECTED = 'FETCH_VERIFY_DOMAINS_REJECTED';
export const FETCH_VERIFY_DOMAINS_FULFILLED = 'FETCH_VERIFY_DOMAINS_FULFILLED';

// Create tenant
export const CREATE_VERIFY_TENANT = "CREATE_VERIFY_TENANT";
export const CREATE_VERIFY_TENANT_PENDING = "CREATE_VERIFY_TENANT_PENDING";
export const CREATE_VERIFY_TENANT_REJECTED = "CREATE_VERIFY_TENANT_REJECTED";
export const CREATE_VERIFY_TENANT_FULFILLED = "CREATE_VERIFY_TENANT_FULFILLED";

// Merge (get-or-create semantics) domain
export const MERGE_VERIFY_DOMAINS = "MERGE_VERIFY_DOMAINS";
export const MERGE_VERIFY_DOMAINS_PENDING = "MERGE_VERIFY_DOMAINS_PENDING";
export const MERGE_VERIFY_DOMAINS_REJECTED = "MERGE_VERIFY_DOMAINS_REJECTED";
export const MERGE_VERIFY_DOMAINS_FULFILLED = "MERGE_VERIFY_DOMAINS_FULFILLED";

// Enroll tenant with domain
export const ENROLL_VERIFY_DOMAIN = "ENROLL_VERIFY_DOMAIN";
export const ENROLL_VERIFY_DOMAIN_PENDING = "ENROLL_VERIFY_DOMAIN_PENDING";
export const ENROLL_VERIFY_DOMAIN_REJECTED = "ENROLL_VERIFY_DOMAIN_REJECTED";
export const ENROLL_VERIFY_DOMAIN_FULFILLED = "ENROLL_VERIFY_DOMAIN_FULFILLED";

// Create domain
export const CREATE_VERIFY_DOMAIN = "CREATE_VERIFY_DOMAIN";
export const CREATE_VERIFY_DOMAIN_PENDING = "CREATE_VERIFY_DOMAIN_PENDING";
export const CREATE_VERIFY_DOMAIN_REJECTED = "CREATE_VERIFY_DOMAIN_REJECTED";
export const CREATE_VERIFY_DOMAIN_FULFILLED = "CREATE_VERIFY_DOMAIN_FULFILLED";

// Merge application
export const MERGE_VERIFY_APPLICATIONS = "MERGE_VERIFY_APPLICATIONS";
export const MERGE_VERIFY_APPLICATIONS_PENDING = "MERGE_VERIFY_APPLICATIONS_PENDING";
export const MERGE_VERIFY_APPLICATIONS_REJECTED = "MERGE_VERIFY_APPLICATIONS_REJECTED";
export const MERGE_VERIFY_APPLICATIONS_FULFILLED = "MERGE_VERIFY_APPLICATIONS_FULFILLED";
