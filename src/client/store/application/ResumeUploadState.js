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

        this.file=InFile.target.files[0];
      console.log(this.file.name, '>> 11111getFiles', this.file.size);
      return this.file;

      // file.forEach(function (f) {
      //   console.log(f.name,'>>',f.size);
      //   return (<div>Filedcscsdcsccsd:{f.name}</div>)
      //
      //
      // });
      // console.log(file[0].name);

    }




  @observable file = {};
    @observable fileNames=[];



}
