SugarCRM.Models.Parameters = Backbone.Model.extend({
  defaults: function() {
    return {
      users:        1000,
      records:      1000000,
      concurrency:  50,
      environments: new SugarCRM.Collections.Environments([
        { name: "On-Site", selected: true,  
          server_types: new SugarCRM.Collections.Servers([
            { make: "Dell", 
              model: "R610", 
              cpu: { cores: 8, clock: 2.13 }, ram: 8, 
              storage: [{ size: 146, iops: 100, quantity: 2 }],
              price: 3414.00,
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
        },
        { name: "Amazon",  selected: false, 
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
        }
      ]),
      os: new SugarCRM.Collections.OperatingSystems([ 
        { name: "Linux",   selected: true  }, 
        { name: "Windows", selected: false } 
      ]),
      solutions:    new SugarCRM.Collections.Solutions([
        { id: "sfa", name: "Sales Force Automation", checked: false, web: 0.0333, api: 0 },
        { id: "call_center", name: "Call Center",    checked: true,  web: 0.0333, api: 0.2 }
      ]),
      average_request_size: 50,  // Average request size in KB
      average_record_size: 50,   // Average record size in KB
      web_cpu_per_request: 0.5,  // Web CPU / Request in GHz
      web_ram_per_request: 278,  // Web RAM / Request in MB
      db_cpu_per_request: 0.4,   // DB CPU / Request in GHz
      db_ram_per_request: 384,   // Web RAM / Request in MB
      resource_threshold: 0.7,   // The percentage of a resource that can be allocated.
    };
  },
  initialize: function() {
    this.updateCalculatedFields();
  },
  updateCalculatedFields: function() {
    this.set('concurrent_users', this.concurrentUsers(), {silent: true});
    this.set('environment', this.environment(), {silent: true});
    this.set('requests_per_second', this.requestsPerSecond(), {silent: true});
    this.set('peak_bandwidth', this.peakBandwidth(), {silent: true});
    this.set('monthly_bandwidth', this.monthlyBandwidth(), {silent: true});
    this.set('web_cpu', this.webCpu(), {silent: true});
    this.set('web_ram', this.webRam(), {silent: true});
    this.set('db_cpu', this.dbCpu(), {silent: true});
    this.set('db_ram', this.dbRam(), {silent: true});
    this.set('db_size', this.dbSize(), {silent: true});
    this.set('db_buffer_pool', this.dbBufferPool(), {silent: true});
    this.set('server_types', this.serverTypes(), {silent: true});
    this.set('web_servers', this.webServers(), {silent: true});
  },
  // Returns concurrent users
  concurrentUsers: function() {
    u = this.get('users');
    c = this.get('concurrency') / 100;
    return Math.round( u * c );
  },
  environment: function() {
    return this.get('environments').selected();
  },
  // Returns total RPS
  requestsPerSecond: function() {
    web_rps     = this.requestsPerSecondFor('web');
    api_rps     = this.requestsPerSecondFor('api');
    return Math.round(web_rps + api_rps);
  },
  // Returns the RPS for a given usage vector (i.e. web or api)
  requestsPerSecondFor: function(vector) {
    // plucks and sums "web", or "api"
    reqPerSec = _.reduce(this.get('solutions').checked(), function(rps, s){ return rps + s.get(vector); }, 0);
    return (reqPerSec * this.concurrentUsers());
  },
  // Bandwidth used at peak concurrency in Megabits
  peakBandwidth: function() {
    return ((this.requestsPerSecond() * this.get('average_request_size') * 8 ) / 1024).toFixed(2)
  },
  // Monthly bandwidth used in Gigabytes
  monthlyBandwidth: function() {
    secondsPerMonth = 60 * 60 * 24 * 30;
    return (this.requestsPerSecond() * this.get('average_request_size') * secondsPerMonth / 1024 / 1024).toFixed(2);
  },
  // Peak Web CPU in Gigahertz
  webCpu: function() {
    return (this.requestsPerSecond() * this.get('web_cpu_per_request')).toFixed(2);
  },
  // Peak Web RAM in Gigahertz
  webRam: function() {
    return ((this.requestsPerSecond() * this.get('web_ram_per_request')) / 1024).toFixed(2);
  },
  // Peak DB CPU in Gigahertz
  dbCpu: function() {
    return (this.requestsPerSecond() * this.get('db_cpu_per_request')).toFixed(2);
  },
  // Peak DB RAM in Gigahertz
  dbRam: function() {
    return ((this.requestsPerSecond() * this.get('db_ram_per_request')) / 1024).toFixed(2);
  },
  // Database Size in GB
  dbSize: function() {
    return ((this.get('average_record_size') * this.get('records') / 1024 / 1024)).toFixed(2);
  },
  // Database Buffer Pool Size in GB
  dbBufferPool: function() {
    dbSize = parseFloat(this.dbSize());
    return (dbSize + (dbSize * 0.2)).toFixed(2);
  },
  serverTypes: function() {
    return this.environment().get('server_types');
  },
  webServers: function() {
    servers     = new SugarCRM.Collections.Servers;
    server_type = this.get('server_types').first();
    total_cpu   = this.get('web_cpu');
    server_cpu  = server_type.cpu_capacity() * 0.7;
    total_servers = total_cpu / server_cpu;
    while (servers.size() <= total_servers) {
      server = new SugarCRM.Models.Server(server_type.toJSON());
      server.set('name', "web-" + servers.size());
      servers.add(server);
    }
    //console.log("Parameters -> webServers");
    //console.log("Servers: " + servers.size());
    //console.log(servers);
    return servers;
  },
  dbServers: function() {
    
  },
  toTemplate: function() {
    // Turn everything into JSON
    json  = this.toJSON();
    // Replace the environments part so we have a select instead
    json.environments     = this.get('environments').toHTMLSelect();
    json.solution_matrix  = this.get('solutions').toHTML();
    return json;
  },
  update: function(e) {
    field = e.currentTarget.id;
    value = e.currentTarget.value;
    console.log(field + " changed to: " + value);
    // Handle the environment drop down
    if (field == "environment") {
      console.log("Toggling environment");
      this.get('environments').toggleSelected(value);
    } else if (this.get('solutions').included(field)) {
      console.log("Toggling solutions");
      this.get('solutions').toggleChecked(field);
    } else {
      this.set(field, value, {silent: true});
    }
    window.lastEvent = e;
    this.updateCalculatedFields();
    this.change();
  }
});