import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {Grid, Typography, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';

const styles = () => ({
  root: {}
});
const headingStyle = {
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    marginBottom: '-20px',
    fontSize: '16px',
};
const fontStyle = {
    fontFamily: 'sans-serif'
};
const liStyle = {
    marginBottom: '5px'
};
@inject('store')
@observer
class Submit extends Component {
  render() {
    const { store, classes } = this.props;

    return (
      <Fragment>
          <Grid container spacing={24}>
              <Grid item xs={12}>
                  <Typography style={headingStyle}>APPLICANT: Please read the following carefully before
                      signing this application.
                  </Typography>
              </Grid>
              <Grid item xs={12}>
                  <ul style={fontStyle}>
                      <li style={liStyle}>
                          I certify the information given by me is true in all respects.
                      </li>
                      <li style={liStyle}>I understand that the misrepresentation or omission of facts on this application, on my resume
                          or during any stage of the hiring process will eliminate me from further consideration or if 
                          discovered after hire may result in the termination of my employment.
                      </li>
                      <li style={liStyle}>I understand that the information contained in this employment application or my being invited
                          to participate in any stage of the hiring process is NOT intended to create an employment
                          contract between this Company and myself. If an employment relationship is established, I
                          understand that I have the right to terminate my employment at any time, for any reason or no
                          reason, with or without notice, and this Company has the right to terminate my employment at
                          any time, for any reason or no reason, with or without notice. This Company’s policies and
                          procedures, including employment at-will, cannot be modified in any way without express
                          written intent to do so by the President of this organization.
                      </li>
                      <li style={liStyle}>
                          I understand that an offer of employment is contingent on my providing sufficient
                          documentation necessary to establish my identity and eligibility to work in the United States.
                      </li>
                      <li style={liStyle}>
                          Unless otherwise noted above, I authorize this Company and its representatives to contact my
                          prior employers, former supervisors and company personnel, schools and all others for the
                          purpose of verifying the information I have supplied during the selection process and for
                          obtaining job-related information regarding my knowledge, skills, abilities, performance of
                          duties and compliance with policies.  I authorize my prior employers to provide this Company
                          any job-related information, personal or otherwise, they may have regarding me and I release
                          this Company and them from any liability resulting from the release of this information.  I
                          further authorize all employers, schools and other persons to provide any information or
                          transcripts that may be requested by this Company, which will be used to determine if I am
                          qualified to perform the job duties for which I am applying.
                      </li>
                  </ul>
              </Grid>
              <Grid item xs={12}>
                  <Typography style={headingStyle}>By submitting, I acknowledge that I have read,
                      understand, and agree with the above statements.
                  </Typography>
              </Grid>
          </Grid>
      </Fragment>
    );
  }
}
Submit.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Submit));
