import { useState } from "react"
import Image from "./ImageComponent";
import "../css/ImageRecognitionComponent.css"

export default function ImageRecognition() {
    const [imageURL, setImageURL] = useState(""); 
    const [ImageFile, setImageFile] = useState<File | null>(null);

    function HandleChange(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files)
        {
            setImageURL(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
        } 
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
    }
    return(
        <>
        <form className="image-form">
            <Image imageURL={imageURL}></Image>
            <input className="image-form__input" type="file" accept="image/*" onChange={HandleChange}></input>
            <button className="image-form__button" onClick={handleClick}>Atpažinti objektus</button>
        </form>
        </>
    )
}