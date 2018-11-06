import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import DropZone from 'react-dropzone';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel
} from '@material-ui/core';
const styles = () => ({
    root: {}
});
@inject('store')
@observer
class ResumeUpload extends Component{
    onDrop(file) {
        this.setState({
            file
        });
    }
    render(){

        const { store, classes } = this.props;
        const file=store.application.resumeUpload;

        return(

        <Fragment>
            <Grid container spacing={24}>
              Resume Upload
                <DropZone  onDrop={this.onDrop.bind(this)}
                >
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </DropZone>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>

                    </ul>
                </aside>
            </Grid>
        </Fragment>
        );
    }
}
ResumeUpload.wrappedComponent.propTypes={
    classes: PropTypes.object.isRequired,
    store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};
export default withStyles(styles)(withRouter(ResumeUpload));