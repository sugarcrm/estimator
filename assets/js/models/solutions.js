SugarCRM.Models.Solution = Backbone.Model.extend()

SugarCRM.Collections.Solutions = Backbone.Collection.extend({
  model: SugarCRM.Models.Solution,
  initialize: function() {
    this.add({ 
      id: "sfa", 
      name: "Sales Force Automation", 
      checked: false, 
      web: 0.0333, 
      api: 0,
      db: { read: 25, write: 1 },   
    }, {silent: true});
    this.add({ 
      id: "call_center", 
      name: "Call Center",
      checked: true,  
      web: 0.0333, 
      api: 0.2,
      db: { read: 25, write: 1 },
    }, {silent: true});
    this.add({ 
      id: "marketing",
      name: "Marketing Automation",
      checked: false,
      web: 0.0333,
      api: 0.02,
      db: { read: 25, write: 3 },
    }, {silent: true});
  },
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
