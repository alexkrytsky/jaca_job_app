import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    withStyles,
    Typography, Grid
} from '@material-ui/core';
import { Cancel, CheckCircle, MonetizationOn, AccountCircle } from '@material-ui/icons';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';

// Component Styles
const styles = theme => ({
    paper: {
        margin: theme.spacing.unit * 2
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        }
    }
});

/**
 * Table for EmploymentDesired to show saved results
 */
@inject('store')
@observer
class EmploymentDesired extends Component {

    render() {
        // const { selectedIndex } = this.state;
        const { store, classes } = this.props;
        const { identity } = store.session;

        const employmentDesired = identity != null && 'employmentDesired' in identity ? identity.employmentDesired : {};
        //console.log(employmentDesired);
        const redColor = {
            color: 'red'
        };
        const greenColor = {
            color: 'green'
        };
        return (
                <Grid container>
                    <Grid item xs={12}>
                        <p><AccountCircle/>Applied For:  <strong>{employmentDesired.employmentDesired}</strong></p>
                    </Grid>
                    <Grid><MonetizationOn style={greenColor}/><strong>Salary Expectations:</strong> ${employmentDesired.salaryExpectations}</Grid>
                    <Grid item xs={11}>
                        <h4>{employmentDesired.applied ? <CheckCircle style={greenColor}/> : <Cancel style={redColor}/>} Applied to MSC within the last 12 month</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>{employmentDesired.workedAtMsc ? <CheckCircle style={greenColor}/> : <Cancel style={redColor}/>} Worked at MSC before</h4>
                    </Grid>
                </Grid>
        );
    }
}

// Tell React that these properties are provided
EmploymentDesired.wrappedComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(EmploymentDesired);
