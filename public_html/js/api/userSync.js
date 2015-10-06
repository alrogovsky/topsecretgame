/**
 * Created by Alex on 04.10.15
 */
define([
    'backbone'
], function(
    Backbone
) {

    var methodMap = {
        'create': 'POST',
        'update': 'POST',
        'delete': 'GET',
        'read': 'GET'
    };

    var urlMap  = {
        'login': '/api/v1/auth/signin',
        'signup': '/api/v1/auth/signup'
    };

    return function(method, model, options) {
        var params = {type: methodMap[method]};
        var modelData = model.toJSON();

        if (method === 'create') {
            params.dataType = 'json';
            params.contentType = 'application/json';
            params.processData = false;
            var success;

            if (model.get('email') === "") {
                params.url = urlMap['login'];
            } else {
                params.url = urlMap['signup'];
                params.data = JSON.stringify(modelData)
            }
        }

        params.error = function () {
            model.signupSuccess(modelData);
        };

        return Backbone.ajax(params);
    }


});