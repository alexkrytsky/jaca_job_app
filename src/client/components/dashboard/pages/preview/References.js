import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Grid,
    TextField,
    withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';
import Tab from '@material-ui/core/Tab/Tab';
import PersonIcon from '@material-ui/icons/Person';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// THIS PAGE IS USED TO DISPLAY ADMIN CONSOLE REFERENCE SECTION

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
 * References to show saved results
 */
@inject('store')
@observer
class References extends Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { store, classes } = this.props;
        const { expanded } = this.state;
        const { identity } = store.session;
        const references = identity != null && 'references' in identity ? identity.references : [];

        return (
            /*form which holds class for the styles*/
            <form className={classes.container} noValidate autoComplete="off">

                {/*Title and Icon*/}
                <Grid item xs={12}>
                    <Tab icon={<PersonIcon />} label="References" style={{ marginBottom: 10, marginTop: 10}}/>
                </Grid>

                {/*map that loops over array and shows each part as entry*/}
                {references.references.map(entry => (
                        /*expansion panel to hold the data*/
                    <ExpansionPanel expanded={expanded === entry.schoolName} onChange={this.handleChange(entry.schoolName)} key={entry.id}>
                        {/*Main title the admin will see*/}
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            {/*holds the reference name information*/}
                            <TextField
                                label="Name"
                                className={classes.textField}
                                value={entry.referenceName}
                                margin="normal"
                                variant="filled"
                                fullWidth
                                disabled={true}
                            />
                        </ExpansionPanelSummary>

                        {/*holds the reference contact name information*/}
                        <ExpansionPanelDetails>
                            <TextField
                                label="Contact Number"
                                className={classes.textField}
                                value={entry.contactNumber}
                                margin="normal"
                                variant="filled"
                                fullWidth
                                disabled={true}
                            />
                        </ExpansionPanelDetails>
                        {/*holds the reference relationship information*/}
                        <ExpansionPanelDetails>
                            <TextField
                                label="Relationship"
                                className={classes.textField}
                                value={entry.relation}
                                margin="normal"
                                variant="filled"
                                fullWidth
                                disabled={true}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </form>
        );
    }
}

// Tell React that these properties are provided
References.wrappedComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(References);

