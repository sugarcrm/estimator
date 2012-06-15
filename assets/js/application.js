var NumberFormat = { prefix: '', centsLimit: 0, centsSeparator: '' };

$(function() {
  registerEvents();
  updateCalculations();
})

function registerEvents() {
  //$('#totalUsers').priceFormat(NumberFormat);
  //$('#totalRecords').priceFormat(NumberFormat);
  $('.calculateable').change(function() { updateCalculations(); });
}

function updateCalculations() {
  $('#concurrentUsers').html(concurrentUsers());
  $('#reqsPerSec').html(requestsPerSecond());
}

function concurrentUsers() {
  t     = $('#totalUsers').unmask();
  c     = $('#concurrency').val() / 100;
  users = Math.round( t * c );
  return users;
}

function requestsPerSecond() {
  solutions   = enabledSolutions();
  users       = concurrentUsers();
  web_rps     = requestsPerSecondFor("web", solutions, users);
  api_rps     = requestsPerSecondFor("api", solutions, users);
  return Math.round(web_rps + api_rps);
}

function enabledSolutions() {
  solutions = {};
  _.each($('.solutions:checked'), function(u){ solutions[u["id"]] = solutionVolumesFor(u["id"]) });
  return solutions;
}

function solutionVolumesFor(solution) {
  s = {};
  _.each(["web", "api"], function(v){ s[v] = parseFloat($('#' + solution + "_" + v + "_rps").html()); });
  return s;
}

// Given a list of solutions, returns total requests per second for a given usage vector.  I.e. web
function sumRequestPerSecondFor(vector, solutions) {
  return _.reduce(_.values(solutions), function(rps, s){ return rps + s[vector]; }, 0);
}

function requestsPerSecondFor(vector, solutions, users) {
  rps = sumRequestPerSecondFor(vector, solutions);
  return (rps * users);
}

var SugarCRM = Backbone.Model.extend({
  defaults: function() {
    return {
      users:        1000,
      records:      1000000,
      conccurency:  50,
      environment:  "On-Site",
      os:           "Linux",
      solutions:    {
        sfa: { web: 0.333, api: 0 }
      }
    };
  },
  
  concurrentUsers: function() {
    u = this.get('users');
    c = this.get('concurrency') / 100;
    return Math.round( u * c );
  },
  
  
}); 

var Solution = Backbone.Model.extend({});
var SolutionList = Backbone.Model.extend({
  model: Solution,
});


var Server      = Backbone.Model.extend({});
var ServerList  = Backbone.Collection.extend({
  model: Server,
  localStorage: new Store("sugarcrm-sizing-servers"),
}); 
var Servers     = new ServerList;
var ServerView  = Backbone.View.extend({
  
});


var ServersView = Backbone.View.extend({
  el: $("#servers"),
  
  render: function() {
    this.$el.html("Hi");
    return this;
  }
});

var ServersApp = new ServersView;
ServersApp.render();

