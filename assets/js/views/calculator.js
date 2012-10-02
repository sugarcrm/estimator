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
