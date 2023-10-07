import { useState } from "react"
import Image from "./ImageComponent";
import "../css/ImageRecognitionComponent.css"
import DetectedObject from "./DetectedObjectComponent";

interface detectedObjectInterface {
    ObjectName: string;
    ObjectScore: number;
  }

export default function ImageRecognition() {
    const [imageURL, setImageURL] = useState(""); 
    const [ImageFile, setImageFile] = useState<File | null>(null);
    const [detectedObjects, setDetectedObjects] = useState<detectedObjectInterface[]>([]);

    function HandleChange(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files)
        {
            setImageURL(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
        } 
    }

    async function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        
        const formData = new FormData();
        if (ImageFile) formData.append('ImageFile', ImageFile);

        try
        {
           fetch("http://localhost:4000/send-data-image",
                {
                    method: "POST",
                    body: formData
                }
           )
           .then(async (res) => 
                {
                    if (res.ok) 
                    {
                        const detectedObjectArray = await res.json();
                        setDetectedObjects(detectedObjectArray);
                        console.log(detectedObjectArray);
                    }
                    else console.log("Klaida");
                }
           );  
        }
        catch(error)
        {
            alert(error);
        }
        
    }
    
    let objects;
    if (detectedObjects) {
        objects = detectedObjects.map((obj, index) => 
        <DetectedObject objectName={obj.ObjectName} objectScore={obj.ObjectScore.toString()}></DetectedObject>
        );      
    };
    
    return(
        <>
        <form className="image-form">
            <Image imageURL={imageURL}></Image>
            <input className="image-form__input" type="file" accept="image/*" onChange={HandleChange}></input>
            <button className="image-form__button" onClick={handleClick}>Atpažinti objektus</button>
        </form>
        
        <div className="image-form__result">
            {objects ? objects : null}
        </div>
        
        </>
        
    )
}