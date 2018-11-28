import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {
    Grid,
    TextField,
    withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';
import Tab from '@material-ui/core/Tab/Tab';
import GenderIcon from '@material-ui/icons/Wc';
import PeopleIcon from '@material-ui/icons/Group';
import DisabilityIcon from '@material-ui/icons/AccessibilityNew';
import StarIcon from '@material-ui/icons/Star';

// THIS PAGE IS USED TO DISPLAY ADMIN CONSOLE EDUCATION SECTION

// Component Styles
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        fontWeight: 'bold',
    },
});

/**
 * VoluntarySurvey to show saved results
 */
@inject('store')
@observer
class VoluntarySurvey extends Component {
    state = {
        expanded: null,
    };


    render() {
        const {store, classes} = this.props;
        const {identity} = store.session;
        const voluntarySurvey = identity != null && 'voluntarySurvey' in identity ? identity.voluntarySurvey : [];

        //console.log(voluntarySurvey);

        return (
            /*form which holds class for the styles*/
            <form className={classes.container} noValidate autoComplete="off">
                {/*Title and Icon for gender*/}
                <Grid item xs={12}>
                    <Tab icon={<GenderIcon/>} label="Gender" style={{marginBottom: 5, marginTop: 5}}/>
                </Grid>
                {/*holds the gender information*/}
                {voluntarySurvey.gender ?
                    <TextField
                        label="Gender"
                        className={classes.textField}
                        value={voluntarySurvey.gender}
                        margin="normal"
                        variant="filled"
                        disabled={true}
                    />
                    :
                    <TextField
                        label=""
                        className={classes.textField}
                        value="No gender was chosen"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                    />
                }

                {/*holds the Ethnic Code information*/}
                {/*Title and Icon for Ethnic Code*/}
                <Grid item xs={12}>
                    <Tab icon={<PeopleIcon/>} label="Ethnicity" style={{marginBottom: 5, marginTop: 5}}/>
                </Grid>

                <Grid item xs={12}>
                    {/*Show information if person is African American */}
                    {voluntarySurvey.afroAmerican ?
                        <TextField
                            label=""
                            style={{margin: 8}}
                            className={classes.textField}
                            value="Black/African-American"
                            margin="normal"
                            variant="filled"
                            disabled={true}
                        />
                        :
                        false}
                    {/*Show information if person is Asian */}
                    {voluntarySurvey.asian ?
                        <TextField
                            label=""
                            style={{margin: 8}}
                            className={classes.textField}
                            value="Asian"
                            margin="normal"
                            variant="filled"
                            disabled={true}
                        />
                        :
                        false}
                    {/*Show information if person is Pacific Islander */}
                    {voluntarySurvey.pacificIslander ?
                        <TextField
                            label=""
                            style={{margin: 8}}
                            className={classes.textField}
                            value="Pacific Islander"
                            margin="normal"
                            variant="filled"
                            disabled={true}
                        />
                        :
                        false}
                    {/*Show information if person is White */}
                    {voluntarySurvey.white ?
                        <TextField
                            label=""
                            style={{margin: 8}}
                            className={classes.textField}
                            value="White"
                            margin="normal"
                            variant="filled"
                            disabled={true}
                        />
                        :
                        false}
                    {/*Show information if person is Hispanic */}
                    {voluntarySurvey.hispanic ?
                        <TextField
                            label=""
                            style={{margin: 8}}
                            className={classes.textField}
                            value="Hispanic"
                            margin="normal"
                            variant="filled"
                            disabled={true}
                        />
                        :
                        false}

                    {/*Show information if person is American Native */}
                    {voluntarySurvey.americanNative ?
                        <TextField
                            label=""
                            style={{margin: 8}}
                            className={classes.textField}
                            value="American Native/ Indian"
                            margin="normal"
                            variant="filled"
                            disabled={true}
                        />
                        :
                        false}
                    {/*Show information if person is other Ethnicity */}
                    {voluntarySurvey.otherEthnicity ?
                        <TextField
                            label=""
                            style={{margin: 8}}
                            className={classes.textField}
                            value="Other"
                            margin="normal"
                            variant="filled"
                            disabled={true}
                        />
                        :
                        false}

                        {/*shows if no ethnicity is chosen on the list*/}
                    {voluntarySurvey.otherEthnicity || voluntarySurvey.afroAmerican || voluntarySurvey.asian
                    || voluntarySurvey.pacificIslander || voluntarySurvey.white || voluntarySurvey.otherEthnicity
                    || voluntarySurvey.hispanic || voluntarySurvey.americanNative ?
                        ""
                        :
                        <TextField
                            label=""
                            style={{margin: 8}}
                            className={classes.textField}
                            value="No ethnicity was chosen"
                            margin="normal"
                            variant="filled"
                            disabled={true}
                        />
                    }

                </Grid>

                {/*Title and Icon*/}
                <Grid item xs={12}>
                    <Tab icon={<DisabilityIcon/>} label="Accessibility" style={{marginBottom: 5, marginTop: 5}}/>
                </Grid>

                {/*Show information if person has a disability */}
                {voluntarySurvey.disability ?
                    <TextField
                        label="Does the individual have a disability?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="Yes"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                    />
                    :
                    <TextField
                        label="Does the individual have a disability?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="No"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                    />
                }

                {/*Title and Icon*/}
                <Grid item xs={12}>
                    <Tab icon={<StarIcon/>} label="Veteran" style={{marginBottom: 5, marginTop: 5}}/>
                </Grid>

                <Grid item xs={5}>
                {/*Show information if person is a Vietnam Era Veteran */}
                {voluntarySurvey.vietnamVeteran ?
                    <TextField
                        label="Is the individual a Vietnam Era Veteran?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="Yes"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    :
                    <TextField
                        label="Is the individual a Vietnam Era Veteran?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="No"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }
                </Grid>
                {/*puts a gap inbetween textfields*/}
                <Grid item xs={1}>
                </Grid>

                <Grid item xs={5}>
                {/*Show information if person is a veteran */}
                {voluntarySurvey.activeDutyVeteran ?
                    <TextField
                        label="Is the individual a Veteran?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="Yes"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    :
                    <TextField
                        label="Is the individual a Veteran?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="No"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }
                </Grid>

                <Grid item xs={5}>
                {/*Show information if person is a a special disabled American Veteran */}
                {voluntarySurvey.disabledVeteran ?
                    <TextField
                        label="Is the individual a special disabled American Veteran?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="Yes"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    :
                    <TextField
                        label="Is the individual a special disabled American Veteran?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="No"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }
                </Grid>
                {/*puts a gap inbetween textfields*/}
                <Grid item xs={1}>
                </Grid>

                <Grid item xs={5}>
                {/*Show information if person is a newly separated veteran */}
                {voluntarySurvey.newVeteran ?
                    <TextField
                        label="Is the individual a newly separated veteran?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="Yes"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    :
                    <TextField
                        label="Is the individual a newly separated veteran?"
                        style={{margin: 8}}
                        fullWidth
                        className={classes.textField}
                        value="No"
                        margin="normal"
                        variant="filled"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }
                </Grid>
            </form>
        );
    }

}

// Tell React that these properties are provided
VoluntarySurvey.wrappedComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.shape({store: PropTypes.instanceOf(RootState)}).isRequired
};

export default withStyles(styles)(VoluntarySurvey);

