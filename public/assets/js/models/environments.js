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
  }
})
