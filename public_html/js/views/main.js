/**
 * Created by Alex on 21.09.15.
 */

define([
    'backbone',
    'tmpl/main',
    'models/user'
], function(
    Backbone,
    tmpl,
    userModel
){

    var View = Backbone.View.extend({

        template: tmpl,
        user: userModel,

        initialize: function () {
            $('#page').append(this.el);
            this.render();
            this.listenTo(this.user, this.user.signupCompleteEvent + " " + this.user.loginCompleteEvent, function(){
                this.render();
            });
        },
        render: function () {
            this.$el.html(this.template);
            if (this.user.logged_in) {
                this.$('#js-login').hide();
                this.$('#js-signup').hide();
            }

            return this;

        },
        show: function () {
            this.$el.show();
            this.trigger("show", this);
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});