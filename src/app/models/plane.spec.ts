import { Plane } from './plane';



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
