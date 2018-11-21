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
    @observable file;
    @observable fileName;

    // @action onDrop(InFile){
    //   if(InFile.target.files[0].size>10000000){
    //     alert("The file is too larges");
    //     return;
    //   }
    //   let typeArr=InFile.target.files[0].name.split(".");
    //   let docType=typeArr[1];
    //   if (docType === 'pdf') {
    //   } else if (docType === 'docx') {
    //   } else if (docType === 'doc') {
    //   } else if (docType === 'txt') {
    //   } else {
    //     alert('Please upload a txt,doc, docx, or pdf file');
    //     console.log(this.file);
    //     return;
    //   }
    //   this.files.concat({
    //     name: InFile.target.files[0].name,
    //     fileByte: InFile.target.files[0],
    //     fileType:docType,
    //   });
    //
    //   console.log();
    //    this.file=(InFile.target.files[0]);
    //     alert("File successfully uploaded");
    //   console.log(this.file.name, '>> 11111getFiles', this.file.size);
    // }
    @action save =(data) =>{
      let typeArr=data[0].name.split(".");
      let docType=typeArr[1];
      if (docType === 'pdf') {
          } else if (docType === 'docx') {
          } else if (docType === 'doc') {
          } else if (docType === 'txt') {
          } else {
            alert('Please upload a txt,doc, docx, or pdf file');
          
            return;
          }
      if(data[0].size>10000000) {
            alert("The file is too larges");
            return;
      }
      this.files.push(data[0]);
      return true;
    }
}
