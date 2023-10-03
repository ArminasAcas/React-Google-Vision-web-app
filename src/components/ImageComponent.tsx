import "../css/ImageComponent.css"

export default function Image(props: {imageURL: string}) {

    return(
        <>
            {props.imageURL.length > 0 ? 
            <img src={props.imageURL} className="image image--show"></img> : <div className="image image--empty"> </div>}
        </> 
    )
}