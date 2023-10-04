import { useState } from "react"
import Image from "./ImageComponent";
import "../css/ImageRecognitionComponent.css"

export default function ImageRecognition() {
    const [image, setImage] = useState(""); 

    function HandleChange(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files) setImage(URL.createObjectURL(e.target.files[0]));
    }
    return(
        <>
        <form className="image-form">
            <Image imageURL={image}></Image>
            <input className="image-form__input" type="file" accept="image/*" onChange={HandleChange}></input>
            <button className="image-form__button">Atpažinti objektus</button>
        </form>
        </>
    )
}