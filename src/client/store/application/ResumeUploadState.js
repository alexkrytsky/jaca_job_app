import React from 'react';
import ResumeUpload from '../../components/application/pages/ResumeUpload';
import FormState from './FormState';
import {observable, action} from "mobx";
import ValidatedField from './ValidatedField';



export default class ResumeUploadState extends FormState {
    constructor() {
        super('ResumeUpload', <ResumeUpload />, 'Errors Remaining.');
    }
  @observable files= [];
    @observable fileIssues="";

    @action save =(data) =>{
      let typeArr=data[0].name.split(".");
      let docType=typeArr[1];
      if (docType === 'pdf') {
          } else if (docType === 'docx') {
          } else if (docType === 'doc') {
          } else if (docType === 'txt') {
          } else {
            this.fileIssues="Please Upload a docx,doc,txt,or pdf";
            console.dir(this.fileIssues);
            return false;
          }
      if(data[0].size>10000000) {
            this.fileIssues="The file you are trying to upload is too large";
        //this.errorFiles.push('The file is too larges');

        return false;
      }
      this.files.push(data[0]);
      this.fileIssues="";
      return true;
    };
    @action remove = (data)=>{
      this.files.splice(data,1);
    }
}
