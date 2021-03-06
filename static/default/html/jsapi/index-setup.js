/* JS App Files */
{% include("jsapi/setup/magic.js") %}
{% include("jsapi/setup/passphrase.js") %}
{% include("jsapi/setup/profiles.js") %}
{% include("jsapi/setup/sources.js") %}
{% include("jsapi/setup/sending.js") %}
{% include("jsapi/setup/advanced.js") %}
{% include("jsapi/setup/security.js") %}
{% include("jsapi/setup/backups.js") %}
{% include("jsapi/setup/access.js") %}
{% include("jsapi/setup/router.js") %}

/* Validation UI Feedback */
_.extend(Backbone.Validation.callbacks, {
  valid: function(view, attr, selector) {
    var msg = $('#validation-' + attr).find('.validation-message').data('message');
    $('#validation-' + attr).find('.validation-message').html(msg).removeClass('validation-error');
    $('#validation-' + attr).find('[' + selector + '=' + attr +']').removeClass('validation-error');
  },
  invalid: function(view, attr, error, selector) {
    var message = $('#validation-' + attr).find('.validation-message').html();
    $('#validation-' + attr).find('.validation-message').data('message', message)
    $('#validation-' + attr).find('.validation-message').html(error).addClass('validation-error');
    $('#validation-' + attr).find('[' + selector + '=' + attr +']').addClass('validation-error');
  }
});

/* Main Init Call */
var SetupApp = (function ($, Backbone, global) {

    var init = function() {

      global.ProfilesCollection = new ProfilesCollection();
      global.SourcesCollection = new SourcesCollection();
      global.SendingCollection = new SendingCollection();

      // Views
      global.ProfilesView   = new ProfilesView({ model: new ProfileModel(), el: $('#setup') });
      global.SourcesView    = new SourcesView({ model: new SourceModel(), el: $('#setup') });
      global.SendingView    = new SendingView({ model: new SendingModel(), el: $('#setup') });
      global.AdvancedView   = new AdvancedView({ el: $('#setup') });
      global.SecurityView   = new SecurityView({ el: $('#setup') });
      global.BackupsView    = new BackupsView({ el: $('#setup') });
      global.AccessView     = new AccessView({ el: $('#setup') });

  		// Router
  		global.Router = new SetupRouter($('#setup'));

      // Start Backbone History
      Backbone.history.start();
    };

    return { init: init };

} (jQuery, Backbone, window));