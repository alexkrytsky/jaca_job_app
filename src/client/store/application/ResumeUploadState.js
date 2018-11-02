import React from 'react';
import ResumeUpload from '../../components/application/pages/ResumeUpload';
import FormState from './FormState';

/**
 * The State for the Resume Upload Form
 */
export default class ResumeUploadState extends FormState {
    constructor() {
        super('ResumeUpload', <ResumeUpload />, 'Errors Remaining.');
    }
}
