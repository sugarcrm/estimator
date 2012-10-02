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
    this.parametersView = new SugarCRM.Views.Parameters({ parameters: this.parameters, el: this.$('#parameters') });
    //this.calculatorView = new SugarCRM.Views.Calculator({ parameters: this.parameters, el: this.$('#calculations') });
    this.topologyView   = new SugarCRM.Views.Topology({ parameters: this.parameters, el: this.$('#topology') });

    console.log("Calling Render!");
    this.parametersView.render();
    //this.calculatorView.render();
    this.topologyView.render();
  },
})

var App = new SugarCRM.Views.SugarCRM;
App.render();
