describe("Parameters Model", function() {
  var p = new SugarCRM.Models.Parameters;

  it("calculates concurrentUsers", function() {
    expect(p.concurrentUsers()).toEqual(500);
  });
  it("contains an environments collection", function() {
    expect(p.get('environments').length).toBeGreaterThan(0);
  });
  it("contains an operating_systems collection", function() {
    expect(p.get('operating_systems').length).toBeGreaterThan(0);
  });
  it("contains an solutions collection", function() {
    expect(p.get('solutions').length).toBeGreaterThan(0);
  });

});