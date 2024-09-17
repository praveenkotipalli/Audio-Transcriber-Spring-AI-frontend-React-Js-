import {  useState } from "react";

import axios from "axios";

const AudioUploader = () =>{

    const [file, setFile] = useState(null);

    const [transcription, setTranscription] = useState("");

    function handleFileChange(e){
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    const handleUpload = async() =>{
        const formData = new FormData();
        formData.append('file',file);

        try{
            const response = await axios.post("https://localhost:8080/api/transcribe", formData, {
                headers:{
                    'Content-Type' :'multipart/form-data',
                }
            });
            setTranscription(response.data);
        }catch(error){
            console.error("Error transcribing audio", error);
        }
    }

    // useEffect(()=>{
    //     axios.get("https://localhost:8080/api/transcribe");
    // })


    return(
        <div className="container">
            <h1>Audio to Text Transcriber</h1>
            <div className="input-field">
                <input type="file" accept="audio/*"  onChange={handleFileChange}/>
            </div>
            
            <button className="button" onClick={handleUpload}>  Upload and transcribe</button>

    {transcription && (
            <>
                <h2 className="result">Transcription Result</h2>
                <p>{transcription}</p> 
            </> 
        )}
        </div>
    )
}

export default AudioUploader;