import React from 'react';
import ResumeUpload from '../../components/application/pages/ResumeUpload';
import FormState from './FormState';
import Dropzone from 'react-dropzone';
import {observable} from "mobx/lib/mobx";
import ValidatedField from "./ValidatedField";


export default class ResumeUploadState extends FormState {
    constructor() {
        super('ResumeUpload', <ResumeUpload />, 'Errors Remaining.');
    }
    onDrop(file){
        this.setState({
            file
        });

      //console.log(file.name, '>> getFiles', file.files);

      file.forEach(function (file) {
        console.log(file.name,'>>',file.size)
      });
    }




  @observable file = [];



}
