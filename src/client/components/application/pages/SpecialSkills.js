import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  withStyles,
  Grid,
  Typography,
  TextField
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import Button from '@material-ui/core/Button/Button';


const styles = () => ({
  typography: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  formControlLabel: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  formControl: {
    minWidth: 120,
  },
});

@inject('store')
@observer
class SpecialSkills extends Component {

  state = {

    skills: "",

    certificates: [{ name: "" }, { issued: "" }, { expire: "" }],

    // field should not show unless clicked
    showField: false
  };

  toggleField = (event) => {
    const doesShow = this.state.showField;
    this.setState({showField: !doesShow})
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="subheading" gutterBottom>
              Special Skills:
            </Typography>
          </Grid>

          {/*skills entered here*/}
            <Grid item xs={6}>
              <Typography variant="headline" gutterBottom>
                Skills:
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-adornment-name"
                //className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                label="Enter skills"
                //value={this.state.skills}
               // onChange={this.handleChange("skills")}
                helperText="Skills: "
              />
            </Grid>


          <Grid item xs={9}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="headline" gutterBottom>
                Certificate:
              </Typography>

              <Grid item xs={6}>
                <TextField
                  id="outlined-adornment-name"
                  //className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Name"
                  //value={this.state.weight}
                  //onChange={this.handleChange("name")}
                  helperText="Name: "
                />

                <TextField
                  id="outlined-adornment-issued"
                  //className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Date Issued"
                  //value={this.state.certificates.issued}
                  //onChange={this.handleChange("issued")}
                  helperText="Date Issued: "
                />

                <TextField
                  id="outlined-adornment-expire"
                  //className={classNames(classes.margin, classes.textField)}
                  variant="outlined"
                  label="Expiration Date"
                  //value={this.state.certificates.expire}
                  //onChange={this.handleChange("expire")}
                  helperText="Expiration Date:"
                />
              </Grid>
            </Grid>
          </Grid>


            <Grid item xs={3}>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  //className={classes.button}
                  //onClick={this.toggleField()}
                >
                  Add more
                </Button>
              </div>
            </Grid>




        </Grid>
      </Fragment>
    );
  }
}

SpecialSkills.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(SpecialSkills));
