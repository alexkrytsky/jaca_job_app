import EmploymentHistoryState
  from '../../../../src/client/store/application/EmploymentHistoryState';

describe('with the Employment History State', () => {
  const store = new EmploymentHistoryState();

  beforeEach(() => {
    store.reset();
  });

  it('should show an error when a field is empty, but not initially', () => {
    expect(store.error)
      .toBe(false);

    store.employer.update('test');
    store.employer.update('');

    expect(store.error)
      .toBe(true);

    store.employer.update('test');

    expect(store.error)
      .toBe(false);
  });

  it('should not save an entry unless all fields are valid', () => {
    expect(store.save())
      .toBe(false);
    expect(store.history.length)
      .toBe(0);

    store.employer.update('employer');
    store.address.update('address');
    store.contactNumber.update('1231231234');
    store.position.update('position');

    expect(store.save())
      .toBe(false);
    expect(store.history.length)
      .toBe(0);

    store.startDate.update('startDate');
    store.endDate.update('endDate');
    store.supervisorName.update('supervisorName');
    store.supervisorTitle.update('supervisorTitle');
    store.reasonLeft.update('reasonLeft');
    store.description.update('description');

    expect(store.save())
      .toBe(true);
    expect(store.history.length)
      .toBe(1);
  });
});
