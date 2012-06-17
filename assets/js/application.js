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
  template: _.template($('#template-topology').html()),
  initialize: function() {
    this.parameters = this.options.parameters;
  },
  render: function() {
    // Compile the template
    html = this.template({});
    // Swap in the template
    $(this.el).html(html);
  }
})

SugarCRM.Views.SugarCRM = Backbone.View.extend({
  el: $('#sugarcrm'),
  template: _.template($('#template-sugarcrm').html()),
  events: {
    "change .calculateable" : "updateParameters",
  },
  initialize: function() {    
    this.parameters     = new SugarCRM.Models.Parameters;
    this.parameters.bind('change', this.render, this);
  },
  updateParameters: function(e) {
    field = e.currentTarget.id;
    value = e.currentTarget.value;
    console.log(field + " changed to: " + value);
    this.parameters.set(field, value);
    this.parameters.updateCalculatedFields();
  },
  render: function() {
    $(this.el).html(this.template({}));
    this.parametersView = new SugarCRM.Views.Parameters({ parameters: this.parameters, el: this.$('#parameters') });
    this.calculatorView = new SugarCRM.Views.Calculator({ parameters: this.parameters, el: this.$('#calculations') });
    this.topologyView   = new SugarCRM.Views.Topology({ parameters: this.parameters, el: this.$('#topology') });

    this.parametersView.render();
    this.calculatorView.render();
    this.topologyView.render();
  },
})


var App = new SugarCRM.Views.SugarCRM;
App.render();

//var ServersView   = new SugarCRM.Views.Servers;
//ServersView.render();

