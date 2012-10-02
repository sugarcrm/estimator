SugarCRM.Views.Topology = Backbone.View.extend({
  template: _.template($('#template-topology').html()),
  initialize: function() {
    this.parameters = this.options.parameters;
  },
  render: function() {
    //console.log("Rendering Servers");
    // Compile the template
    servers = { web_servers: this.parameters.get('web_servers').toHTML() };
    html    = this.template(servers);
    // Swap in the template
    $(this.el).html(html);
  }
})