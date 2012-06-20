SugarCRM.Models.RuntimeEnvironment = Backbone.Model.extend()

SugarCRM.Collections.RuntimeEnvironments = Backbone.Collection.extend({
  model: SugarCRM.Models.RuntimeEnvironment,
  toHTML: function() {
    template = _.template($('#template-runtime-environment').html());
    return this.reduce(function(html, e) {
      return html + template(e.toJSON()) }, ''
    );
  },
})
