SugarCRM.Models.Solution = Backbone.Model.extend()

SugarCRM.Collections.Solutions = Backbone.Collection.extend({
  model: SugarCRM.Models.Solution,
  toHTML: function() {
    template = _.template($('#template-solution-row').html());
    return this.reduce(function(html, e) {
      return html + template(e.toJSON()) }, ''
    );
  },
  checked: function() {
    return this.filter(function(e) { return e.get('checked') == true });
  },
  toggleChecked: function(id) {
    // Find the selected value by name
    e = this.find(function(e) { return e.get('id') == id } );
    if (e !== null && e) {
      if (e.get('checked')) {
        console.log("Unchecking: " + id);
        e.set('checked', false);
      } else {
        console.log("Checking: " + id);
        e.set('checked', true);
      }
      return true;
    } else {
      return false;
    }
  },
  included: function(id) {
    return _.include(this.pluck('id'), id);
  }
})
