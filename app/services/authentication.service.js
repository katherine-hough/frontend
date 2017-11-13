'use strict';

angular
    .module('s2n.services', ['ngRoute'])

    .factory('AuthFactory', ['$http', '$cookies', function($http, $cookies) {

        AuthFactory.register = function(password, username) {
            return $http.post('/dummypath', { //TODO: update this!
                username: username,
                password: password
            }).then(registerSuccessFn, registerFailureFn);

            function registerSuccessFn(data, status, headers, config) {
                AuthenticationFactory.login(username, password);
            }

            function registerFailureFn(data, status, headers, config) {
                console.error('Comrade, your registration failed mother country...');
                //$location.path('/register');
            }            
        }

        AuthFactory.login = function(username, password) {
            return $http.post('/dummypath', { //TODO: update this
                username: username, 
                password: password
            } ).then(loginSuccessFn, loginFailureFn);

            function loginSuccessFn(data, status, headers, config) {
                AuthFactory.setAuthenticatedAccount(data.data);
                //$location.path('/');
            }

            function loginFailureFn(data, status, headers, config) {
                console.error('Your login failed mate...');
                //$location.path('/');
            }
        }

        function setAuthenticatedAccount() {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function getAuthenticatedAccount() {
            if(!$cookies.authenticatedAccount) {
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        AuthFactory.isAuthenticated = function() {
            return !!$cookies.authenticatedAccount;
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }

        function logout() {
            return $http.post('/logoutpath') //TODO add this
                .then(logoutSuccessFn, logoutFailureFn);

            function logoutSuccessFn(data, status, headers, config) {
                AuthFactory.unauthenticate();
                //$location.path('/');
            }

            function logoutFailureFn(data, status, headers, config) {
                console.error('Logout Failed... ?')
            }
        }

        var AuthFactory = {};

            AuthFactory.login = login;
            AuthFactory.register = register;
            AuthFactory.logout = logout;
            AuthFactory.getAuthenticatedAccount = getAuthenticatedAccount;
            AuthFactory.setAuthenticatedAccount = setAuthenticatedAccount;
            AuthFactory.isAuthenticated = isAuthenticated;
            AuthFactory.unauthenticate = unauthenticate;

        return AuthFactory;
}]);



    // Base64 encoding service used by Authentication
/*
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
*/