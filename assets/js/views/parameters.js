SugarCRM.Views.Parameters = Backbone.View.extend({
  template: _.template($('#template-parameters').html()),
  initialize: function() {
    this.parameters = this.options.parameters;
  },
  updateFields: function() {
    // Update the selected drop down
    //$('#environment').val(this.parameters.environment().get('name'));
    //_.each(this.parameters.get('solutions').checked(), function(s){
    //  $('#'+s.get('id')).prop('checked', s.get('checked'));
    //});
  },
  render: function() {
    // Compile the template
    html = this.template(this.parameters.toTemplate());
    // Swap in the template
    $(this.el).html(html);
    this.updateFields();
  },
})