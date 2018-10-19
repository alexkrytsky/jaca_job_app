import GeneralInfoState from '../../../../src/client/store/application/GeneralInfoState';

describe('with the General Info State', () => {
  let store = null;

  beforeEach(() => {
    store = new GeneralInfoState();
  });

  it('should show an error when a field is empty, but not initially', () => {
    expect(store.error)
      .toBe(false);

    store.firstName.update('test');
    store.firstName.update('');

    expect(store.error)
      .toBe(true);

    store.firstName.update('test');

    expect(store.error)
      .toBe(false);
  });
});
