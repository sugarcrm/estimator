SugarCRM.Models.Environment = Backbone.Model.extend()

SugarCRM.Collections.Environments = Backbone.Collection.extend({
  model: SugarCRM.Models.Environment,
  toHTMLSelect: function() {
    return this.reduce(function(html, e) { 
      return html + '<option value="' + e.get('name') + '">' +  e.get('name') + '</option>\n' }, ''
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
