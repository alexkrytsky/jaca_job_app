import React from 'react';
import ResumeUpload from '../../components/application/pages/ResumeUpload';
import FormState from './FormState';
import Dropzone from 'react-dropzone';
import {observable} from "mobx/lib/mobx";
import ValidatedField from "./ValidatedField";

/**
 * The State for the Resume Upload Form
 */
export default class ResumeUploadState extends FormState {
    constructor() {
        super('ResumeUpload', <ResumeUpload />, 'Errors Remaining.');
    }
    onDrop(file){
        this.setState({
            file
        });
    }
    @observable file = [];


}
