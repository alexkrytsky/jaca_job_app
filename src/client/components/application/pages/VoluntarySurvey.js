import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

import {
    Checkbox,
    FormControlLabel,
    Grid,
    Typography,
    withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import ValidatedRadioGroup from "./components/ValidatedRadioGroup";
import Radio from "@material-ui/core/Radio/Radio";

// Component Styles
const styles = theme => ({
    padding: {
        padding: theme.spacing.unit * 2
    }
});

/**
 * Voluntary form
 */
@inject('store')
@observer
class VoluntarySurvey extends Component {
  render() {
    const { store, classes } = this.props;
      const {
          gender,
          white,
          hispanic,
          americanNative,
          afroAmerican,
          asian,
          pacificIslander,
          vietnamVeteran,
          activeDutyVeteran,
          disabledVeteran,
          newVeteran,
          disability
      } = store.application.voluntarySurvey;

    return (
      <Fragment>
        <Grid container spacing={24}>
            <Grid item xs={12} sm={9}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender:</FormLabel>
                    <ValidatedRadioGroup
                        style={{ display: 'flex', flexDirection: 'row' }}
                        aria-label="gender"
                        name="gender"
                        className={classes.group}
                        value="true"
                        onChange={event => gender.update(event.target.checked)}
                        state={gender}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </ValidatedRadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subheading">Ethnic Code (Check all that apply):</Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="white"
                            value="true"
                            checked={white.value}
                            onChange={event => white.update(event.target.checked)}
                        />
                    )}
                    label="White"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={4} sm={4}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="hispanic"
                            value="true"
                            checked={hispanic.value}
                            onChange={event => hispanic.update(event.target.checked)}
                        />
                    )}
                    label="Hispanic"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={4} sm={4}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="americanNative"
                            value="true"
                            checked={americanNative.value}
                            onChange={event => americanNative.update(event.target.checked)}
                        />
                    )}
                    label="American Indian / Alaskan Native"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={4} sm={4}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="afroAmerican"
                            value="true"
                            checked={afroAmerican.value}
                            onChange={event => afroAmerican.update(event.target.checked)}
                        />
                    )}
                    label="Black / African American"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={4} sm={4}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="asian"
                            value="true"
                            checked={asian.value}
                            onChange={event => asian.update(event.target.checked)}
                        />
                    )}
                    label="Asian"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={4} sm={4}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="pacificIslander"
                            value="true"
                            checked={pacificIslander.value}
                            onChange={event => pacificIslander.update(event.target.checked)}
                        />
                    )}
                    label="Pacific Islander"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subheading">Check all that apply</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="vietnamVeteran"
                            value="true"
                            checked={vietnamVeteran.value}
                            onChange={event => vietnamVeteran.update(event.target.checked)}
                        />
                    )}
                    label="Are you a Vietnam Era Veteran, a person that served a minimum of 180 days active duty in
                            the Armed forces between 8/5/64 and 5/7/75?"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="activeDutyVeteran"
                            value="true"
                            checked={activeDutyVeteran.value}
                            onChange={event => activeDutyVeteran.update(event.target.checked)}
                        />
                    )}
                    label="Are you a veteran, a person who has served on active duty during a war or in a campaign or
                        expedition for which a campaign ribbon or badge has been authorized?"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="disabledVeteran"
                            value="true"
                            checked={disabledVeteran.value}
                            onChange={event => disabledVeteran.update(event.target.checked)}
                        />
                    )}
                    label="Are you a special disabled American Veteran?  A special disabled veteran is a person that is
                    entitled to disability compensation under the laws administered by the Veterans Administration for
                    disability rated at 30% or more, or rated at 10 to 20 percent in the case of a veteran who has been
                    determined under section 1506 of Title 38 U.S.C. to have a serious employment disability; or a
                    person whose discharge or release from active duty was for a disability incurred in the line of
                    active duty."
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="newVeteran"
                            value="true"
                            checked={newVeteran.value}
                            onChange={event => newVeteran.update(event.target.checked)}
                        />
                    )}
                    label="Are you a newly separated veteran, a person who has served on active duty in the US military,
                     ground, naval or air service during the one-year period beginning on the date of your discharge or
                      release from active duty?"
                    className={classes.formControlLabel}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="secondary"
                            name="disability"
                            value="true"
                            checked={disability.value}
                            onChange={event => disability.update(event.target.checked)}
                        />
                    )}
                    label="Are you an individual with a disability? An individual with a disability means any person
                    who: (1) has a physical or mental impairment which substantially limits one or more of life's
                    activities; (2) has a record of such an impairment; or (3) is regarded as having such an impairment."
                    className={classes.formControlLabel}
                />
            </Grid>
        </Grid>
      </Fragment>
    );
  }
}

VoluntarySurvey.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(VoluntarySurvey));
