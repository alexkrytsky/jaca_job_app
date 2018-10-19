import RootState from '../../../src/client/store/RootState';

describe('with the RootState', () => {
  let store = null;

  beforeEach(() => {
    store = new RootState();
  });

  it('should toggle the open state with toggleDrawer', () => {
    expect(store.open)
      .toBe(false);

    store.toggleDrawer();

    expect(store.open)
      .toBe(true);
  });

  it('should close the open state with closeDrawer', () => {
    expect(store.open)
      .toBe(false);

    store.closeDrawer();

    expect(store.open)
      .toBe(false);

    store.toggleDrawer();
    store.closeDrawer();

    expect(store.open)
      .toBe(false);
  });
});
