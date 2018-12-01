import { action, observable } from 'mobx';
import React from 'react';
import ResumeUpload from '../../components/application/pages/ResumeUpload';
import FormState from './FormState';

export default class ResumeUploadState extends FormState {
  constructor() {
    super('ResumeUpload', <ResumeUpload />, 'Errors Remaining.');
  }

  @observable files = [];

  @observable fileIssues = '';

  /**
   * Save a FileList to state
   * @param data {FileList}
   * @returns {boolean}
   */
  @action save = (data) => {
    this.fileIssues = '';
    let error = false;
    Object.values(data)
      .filter(value => value instanceof File)
      .forEach((file) => {
        const typeArr = file.name.split('.');
        const docType = typeArr[1];
        if (file.size > 1000000) {
          this.fileIssues = 'The file you are trying to upload is too large, Limit of 1 MB';
          error = true;
        }
        if (docType === 'pdf' || docType === 'docx' || docType === 'doc' || docType === 'txt') {
          this.files.push(file);
        } else {
          this.fileIssues = 'Please Upload a docx, doc, pdf or txt';
          error = true;
        }
      });
    return error;
  };

  @action remove = (data) => {
    this.files.splice(data, 1);
  };
}
