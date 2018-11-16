import React from 'react';
import ResumeUpload from '../../components/application/pages/ResumeUpload';
import FormState from './FormState';
import Dropzone from 'react-dropzone';
import {observable} from "mobx";
import ValidatedField from "./ValidatedField";



export default class ResumeUploadState extends FormState {
    constructor() {
        super('ResumeUpload', <ResumeUpload />, 'Errors Remaining.');
    }
    onDrop(InFile){
      if(InFile.target.files[0].size>10000000){
        alert("The file is too larges");
        return;
      }
      let typeArr=InFile.target.files[0].name.split(".");
      let docType=typeArr[1];
      if (docType === 'pdf') {
      } else if (docType === 'docx') {
      } else if (docType === 'doc') {
      } else if (docType === 'txt') {
      } else {
        alert('Please upload a txt,doc, docx, or pdf file');
        console.log(this.file);
        return;
      }
        this.file=InFile.target.files[0];
      console.log(this.file.name, '>> 11111getFiles', this.file.size);






    }




  @observable file = [];




}
