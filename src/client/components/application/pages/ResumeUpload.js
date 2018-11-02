import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import Dropzone from 'react-dropzone';
const styles = () => ({
    root: {}
});
@inject('store')
@observer
class ResumeUpload extends Component{
    render(){
        const { store, classes } = this.props;
        return(
        <Fragment>
          Resume Upload
            <Dropzone onDrop={(file) => this.onDrop(file)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
        </Fragment>
        );
    }
}
ResumeUpload.wrappedComponent.propTypes={
    classes: PropTypes.object.isRequired,
    store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};
export default withStyles(styles)(withRouter(ResumeUpload));