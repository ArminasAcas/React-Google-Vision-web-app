import { useState } from "react"
import Image from "./ImageComponent";
import "../css/ImageRecognitionComponent.css"
import DetectedObject from "./DetectedObjectComponent";
import InformationBlock from "./InformationComponent";

interface detectedObjectInterface {
    ObjectName: string;
    ObjectScore: number;
  }

const detectionStatus = {
    detecting: "detecting",
    detectedObjects: "detected_objects",
    detectedNothing: "detected_nothing",
    error: "error",
    missingImage: "missing_image"
}

export default function ImageRecognition() {
    const [imageURL, setImageURL] = useState(""); 
    const [ImageFile, setImageFile] = useState<File | null>(null);
    const [detectedObjects, setDetectedObjects] = useState<detectedObjectInterface[]>([]);
    const [status, setStatus] = useState("");

    function HandleChange(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files)
        {
            setImageURL(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
        } 
    }

    async function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        
        if (ImageFile && ImageFile.size > 0)
        {
            const formData = new FormData();
            formData.append('ImageFile', ImageFile);

            try
            {
               setStatus(detectionStatus.detecting);
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
    
                            if (detectedObjectArray && detectedObjectArray.length > 0)
                            {
                                setDetectedObjects(detectedObjectArray);
                                setStatus(detectionStatus.detectedObjects);
                            }
                            else setStatus(detectionStatus.detectedNothing);
                            
                        }
                        else setStatus(detectionStatus.error);
                    }
               )
               .catch( error => 
                    {
                        setStatus(detectionStatus.error);
                    }
                ); 
            }
            catch(error)
            {
                setStatus(detectionStatus.error);
            } 
        }
        else setStatus(detectionStatus.missingImage); 

    }
    
    let objects;
    if (detectedObjects) {
        objects = detectedObjects.map((obj, index) => 
        <DetectedObject key={index} objectName={obj.ObjectName} objectScore={obj.ObjectScore.toString()}></DetectedObject>
        );      
    };
    
    return(
        <>
        <form className="image-form">
            <Image imageURL={imageURL}></Image>
            <input className="image-form__input" type="file" accept="image/*" onChange={HandleChange}></input>
            <button className="image-form__button" onClick={handleClick}>Atpažinti objektus</button>
        </form>
        
        {status === detectionStatus.detectedObjects ? <div className="image-form__result"> {objects} </div> : null}
        {status === detectionStatus.detectedNothing ? <InformationBlock informationText="Nuotraukoje neaptikti jokie objektai!"></InformationBlock> : null}
        {status === detectionStatus.error? <InformationBlock informationText="Įvyko klaida!"></InformationBlock> : null}
        {status === detectionStatus.detecting? <InformationBlock informationText="Ieškomi objektai nuotraukoje. Palaukite..."></InformationBlock> : null}
        {status === detectionStatus.missingImage? <InformationBlock informationText="Trūksta nuotraukos! Įkelkite nuotrauką."></InformationBlock> : null}
        </>
        
    )
}