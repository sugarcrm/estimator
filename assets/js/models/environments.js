SugarCRM.Models.Environment = Backbone.Model.extend()

SugarCRM.Collections.Environments = Backbone.Collection.extend({
  model: SugarCRM.Models.Environment,
  
  initialize: function() {
    this.add({ name: "On-Site", selected: true,  
      server_types: new SugarCRM.Collections.Servers([
        { make: "Dell", 
          model: "R610", 
          cpu: { cores: 8, clock: 2.13 }, ram: 8, 
          storage: [{ size: 146, iops: 100, quantity: 2 }],
          price: 3414.00, // Todo: Turn price into an object so capex and monthly can be managed
        },
        { make: "Dell", 
          model: "R710",
          cpu: { cores: 12, clock: 2.26 }, ram: 32, 
          storage: [
            { size: 146, iops: 100, quantity: 2 },
            { size: 300, iops: 100, quantity: 4 }
          ],
          price: 6886.00,
        },
      ]),
    },{silent: true});
    this.add({ name: "Amazon",  selected: false, 
      server_types: new SugarCRM.Collections.Servers([
        { make: "Amazon", 
          model: "m1.small",
          cpu: { cores: 1, clock: 1.2 }, ram: 1.7,
          storage: [
            { size: 160, iops: 50, quantity: 1 },
          ],
          price: 0.50,
        }
      ]),
    }, {silent: true});
  }, 
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
