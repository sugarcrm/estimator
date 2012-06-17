SugarCRM.Collections.Servers = Backbone.Collection.extend({
  model: SugarCRM.Models.Server,
  initialize: function(parameters) {
    this.parameters = parameters;
  },
  environment: function() {
    return this.parameters.get("environment");
  },
})
