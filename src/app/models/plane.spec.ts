import { Plane } from './plane';


let plane: Plane;

describe('before & after', function () {
  beforeEach(function () {
    plane = new Plane();
  });
  afterEach(function () {
    // clean up
  });
});

describe('Plane', () => {
  it('should create an instance', () => {
    expect(new Plane()).toBeTruthy();
  });
});

describe('Plane', () => {
  it('should create plane named DC-10', () => {
    expect(new Plane().name = 'DC-10').toEqual('DC-10');
  });
});

describe('Plane', () => {
  it('should create plane with manufacturer Boeing', () => {
    expect(new Plane().manufacturer = 'Boeing').toEqual('Boeing');
  });
});

describe('Plane', () => {
  it('should create plane with 10 seats', () => {
    expect(new Plane().seats = 10).toEqual(10);
  });
});

describe('Plane', () => {
  it('should create plane with a range of 1000 miles', () => {
    expect(new Plane().range = 1000).toEqual(1000);
  });
});

describe('Plane', () => {
  it('should create plane with a fuel efficiency of 0', () => {
    expect(new Plane().fuelEfficiency = 0).toEqual(0);
  });
});

describe('Plane', () => {
  it('should create plane with a maintenance rating of 0', () => {
    expect(new Plane().maintenance = 0).toEqual(0);
  });
});

describe('Plane', () => {
  it('should create plane with a production year of 1980', () => {
    expect(new Plane().productionYear = '1980').toEqual('1980');
  });
});

describe('Plane', () => {
  it('should create plane with a price > 1.00', () => {
    expect(new Plane().price = 2).toBeGreaterThan(1.00);
  });
});


