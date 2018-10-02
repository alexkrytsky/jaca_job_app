import { action, observable } from 'mobx';

export default class TestState {
  @observable username = 'Loading... please wait!';

  @observable jobs = ['Loading... please wait!'];

  @action load = () => {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then((user) => {
        this.username = user.username;
      });
    fetch('/api/jobs')
      .then(res => res.json())
      .then((res) => {
        let delay = 0;
        this.jobs.replace([]);
        res.jobs.forEach(job => {
          setTimeout(() =>this.jobs.push(job), ++delay * 500)
        });
      });
  }
}
