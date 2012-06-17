SugarCRM.Views.Parameters = Backbone.View.extend({
  template: _.template($('#template-parameters').html()),
  initialize: function() {
    this.parameters = this.options.parameters;
  },
  render: function() {
    // Compile the template
    html = this.template(this.parameters.toTemplate());
    // Swap in the template
    $(this.el).html(html);
    // Update the selected drop down
    $('#environment').val(this.parameters.get('environments').selected().get('name'));
  }
})

SugarCRM.Views.Calculator = Backbone.View.extend({
  template: _.template($('#template-calculations').html()),
  initialize: function() {
    this.parameters = this.options.parameters;
  },
  render: function() {
    // Compile the template
    html = this.template(this.parameters.toTemplate());
    // Swap in the template
    $(this.el).html(html);
  }
})

SugarCRM.Views.Topology = Backbone.View.extend({
  initialize: function(parameters) {
    this.parameters = parameters;
  }
})

SugarCRM.Views.SugarCRM = Backbone.View.extend({
  el: $('#sugarcrm'),
  template: _.template($('#template-sugarcrm').html()),
  initialize: function() {
    this.parameters     = new SugarCRM.Models.Parameters;
    this.servers        = new SugarCRM.Collections.Servers(this.parameters);
  },
  render: function() {
    $(this.el).html(this.template({}));
    this.parametersView = new SugarCRM.Views.Parameters({ parameters: this.parameters, el: this.$('#parameters') });
    this.calculatorView = new SugarCRM.Views.Calculator({ parameters: this.parameters, el: this.$('#calculations') });
    //this.topologyView   = new SugarCRM.Views.Topology(this.parameters);

    this.parametersView.render();
    this.calculatorView.render();
    //this.topologyView.render();
  },
})


var App = new SugarCRM.Views.SugarCRM;
App.render();

//var ServersView   = new SugarCRM.Views.Servers;
//ServersView.render();

