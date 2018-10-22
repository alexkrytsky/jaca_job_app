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
    withStyles
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
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

//Table for references to show saved entries
@inject('store')
@observer
class ReferenceTable extends Component{
    render(){
        //Styling the table header
        const DarkTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText
            }
        }))(TableCell);

        const {store, classes } = this.props;
        const {references, removeReference} = store.application.references;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <DarkTableCell>Name</DarkTableCell>
                            <DarkTableCell>Phone</DarkTableCell>
                            <DarkTableCell>Relation</DarkTableCell>
                            <DarkTableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {references.map(entry => (
                            <TableRow className={classes.row} key={entry.id}>
                                <TableCell component="th" scope="row">
                                    {entry.referenceName}
                                </TableCell>
                                <TableCell>
                                    {entry.contactNumber}
                                </TableCell>
                                <TableCell>
                                    {entry.relation}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        mini
                                        color="secondary"
                                        aria-label="Delete"
                                        onClick={() => removeReference(entry.id)}
                                    >
                                        <Delete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    };
}

ReferenceTable.wrappedComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.shape({store: PropTypes.instanceOf(RootState)}).isRequired
};

export default withStyles(styles)(ReferenceTable);