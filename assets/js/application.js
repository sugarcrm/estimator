SugarCRM.Views.Parameters = Backbone.View.extend({
  template: _.template($('#template-parameters').html()),
  initialize: function() {
    this.parameters = this.options.parameters;
  },
  updateFields: function() {
    // Update the selected drop down
    $('#environment').val(this.parameters.environment().get('name'));
    _.each(this.parameters.get('solutions').checked(), function(s){
      $('#'+s.get('id')).prop('checked', s.get('checked'));
    });
  },
  render: function() {
    // Compile the template
    html = this.template(this.parameters.toTemplate());
    // Swap in the template
    $(this.el).html(html);
    this.updateFields();
  },
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
    //console.log("Rendering Servers");
    // Compile the template
    servers = { web_servers: this.parameters.get('web_servers').toHTML() };
    html    = this.template(servers);
    // Swap in the template
    $(this.el).html(html);
  }
})

SugarCRM.Views.SugarCRM = Backbone.View.extend({
  el: $('#sugarcrm'),
  template: _.template($('#template-sugarcrm').html()),
  events: {
    "change .calculateable" : "update",
  },
  initialize: function() {    
    this.parameters     = new SugarCRM.Models.Parameters;
    this.parameters.bind('change', this.render, this);
  },
  update: function(e) {
    this.parameters.update(e);
  },
  render: function() {
    $(this.el).html(this.template({}));
    this.parametersView = new SugarCRM.Views.Parameters({ parameters: this.parameters, el: this.$('#parameters')   });
    this.calculatorView = new SugarCRM.Views.Calculator({ parameters: this.parameters, el: this.$('#calculations') });
    this.topologyView   = new SugarCRM.Views.Topology({   parameters: this.parameters, el: this.$('#topology')     });

    console.log("Calling Render!");
    this.parametersView.render();
    this.calculatorView.render();
    this.topologyView.render();
  },
})

var App = new SugarCRM.Views.SugarCRM;
App.render();
