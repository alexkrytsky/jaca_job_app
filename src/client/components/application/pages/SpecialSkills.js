import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';


const styles = () => ({
  root: {}
});

@inject('store')
@observer
class SpecialSkills extends Component {
  render() {
    const { store, classes } = this.props;
    return (
      <Fragment>
        SpecialSkills
      </Fragment>
    );
  }
}

SpecialSkills.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(SpecialSkills));