SugarCRM.Models.OperatingSystem = Backbone.Model.extend()

SugarCRM.Collections.OperatingSystems = Backbone.Collection.extend({
  model: SugarCRM.Models.OperatingSystem,

  toHTMLSelect: function() {
    template = _.template('<option value="<%= name %>"><%= name %></option>');
    return this.reduce(function(html, e) { 
      return html + template(e.toJSON()) }, ''
    );
  },
  selected: function() {
    return this.find(function(e) { return e.get('selected') == true });
  },
  toggleSelected: function(name) {
    // Find the selected value by name
    e = this.find(function(e) { return e.get('name') == name } );
    if (e !== null && e) {
      // Clear the currently selected item
      this.selected().set('selected', false);
      // Set selected on the new target
      e.set('selected', true);
      return true;
    } else {
      return false;
    }
  }
})
