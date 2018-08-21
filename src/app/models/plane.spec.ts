import { Plane } from './plane';



describe('Test Setup', function () {
  beforeEach(function () {
    console.log('created');
  });
  afterEach(function () {
    // clean up
  });
  beforeAll(function () {
  });
});


describe('Create Plane', () => {
  let plane: Plane;
  beforeAll(function () {
    plane = new Plane();
  });
  it('should create an instance', () => {
    expect(plane).toBeTruthy();
  });
  it('should create plane named DC-10', () => {
    expect(plane.name = 'DC-10').toEqual('DC-10');
  });
  it('should create plane with manufacturer Boeing', () => {
    expect(plane.manufacturer = 'Boeing').toEqual('Boeing');
  });
  it('should create plane with 10 seats', () => {
    expect(plane.seats = 10).toEqual(10);
  });
  it('should create plane with a range of 1000 miles', () => {
    expect(plane.range = 1000).toEqual(1000);
  });
  it('should create plane with a fuel efficiency of 0', () => {
    expect(plane.fuelEfficiency = 0).toEqual(0);
  });
  it('should create plane with a maintenance rating of 0', () => {
    expect(plane.maintenance = 0).toEqual(0);
  });
  it('should create plane with a production year of 1980', () => {
    expect(plane.productionYear = '1980').toEqual('1980');
  });
  it('should create plane with a price > 1.00', () => {
    expect(plane.price = 2).toBeGreaterThan(1.00);
  });
});
