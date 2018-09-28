import React, { Component } from 'react';

// ----------------------------------------------------------------------
// IMPORT BOOTSTRAP
// ----------------------------------------------------------------------

export default class FileManager extends Component {

    constructor(props) {

        super();

        this.handleFileNew      = props.handleFileNew
        this.handleFileSave     = props.handleFileSave
        this.handleFileLoad     = props.handleFileLoad

        this.handleNew          = this.handleNew.bind(this);
        this.handleLoad         = this.handleLoad.bind(this);
        this.handleSave         = this.handleSave.bind(this);
    }

    handleNew(event) {

        if (event.target.files && event.target.files[0]) {

            let reader          = new FileReader();
                reader.name     = event.target.files[0].name
                reader.onload   = (e) => {
                    
                let img                     = new Image();
                    img.handleFileNew       = this.handleFileNew
                    img.name                = reader.name
                    img.onload              = function() {

                        this.handleFileNew(e.target.result, img.width, img.height, img.name)
                    };
                        
                    img.src = reader.result;
                };

            reader.readAsDataURL(event.target.files[0]);
        }     
    }

    handleLoad(event) {

        if (event.target.files && event.target.files[0]) {

            if (event.target.files[0].type.match('json.*')) {

                let reader          = new FileReader();
                    reader.onload   = (e) => {
                        
                        this.handleFileLoad(JSON.parse(e.target.result))
                    };
                            
                    reader.readAsText(event.target.files[0])
            }
        }     
    }

    handleSave(event){

        this.handleFileSave()
    }
    
    render(){
        return(
            <div>
                <div className  = "btn-group">
                    <label className  = "btn btn-default"> New Image
                        <input  type        = "file" 
                                style       = {{display: 'none'}} 
                                onChange    = {this.handleNew.bind(this)} 
                                className   = "filetype"/>
                    </label>

                    <a  href        = "jsx-a11y/href-no-hash" 
                        className   = "btn btn-default" 
                        onClick     = {this.handleSave}>Save
                    </a>

                    <label className  = "btn btn-default"> Open
                        <input  type        = "file" 
                                style       = {{display: 'none'}} 
                                onChange    = {this.handleLoad.bind(this)} 
                                className   = "filetype"/>
                    </label>
                </div>
            </div>
        );
    }
}