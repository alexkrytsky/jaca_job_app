import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import DropZone from 'react-dropzone';
const styles = () => ({
    root: {}
});
@inject('store')
@observer
class ResumeUpload extends Component{
    render(){
        const { store, classes } = this.props;
        const file=store.application.resumeUpload;
        return(
        <Fragment>
          Resume Upload
            <DropZone>
                <div>Try dropping some files here, or click to select files to upload.</div>
            </DropZone>
        </Fragment>
        );
    }
}
ResumeUpload.wrappedComponent.propTypes={
    classes: PropTypes.object.isRequired,
    store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};
export default withStyles(styles)(withRouter(ResumeUpload));