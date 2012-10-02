SugarCRM.Models.Server = Backbone.Model.extend({
  cpu_capacity: function() { 
    cpu = this.get('cpu');
    return cpu.cores * cpu.clock;
  },
})

SugarCRM.Collections.Servers = Backbone.Collection.extend({
  model: SugarCRM.Models.Server,
  initialize: function(parameters) {
    this.parameters = parameters;
  },
  environment: function() {
    return this.parameters.get("environment");
  },
  toHTML: function() {
    template = _.template($('#template-server-row').html());

    return this.reduce(function(html, server) {
      return html + template(server.toJSON());
    }, '');
  }
})
