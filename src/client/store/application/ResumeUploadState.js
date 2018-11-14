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

      file.forEach(function (f) {
        console.log(f.name,'>>',f.size)
        return <div>{file.name}</div>


      });
      console.log(file[0].name);

    }




  @observable file = [];
    @observable fileNames=[];



}
