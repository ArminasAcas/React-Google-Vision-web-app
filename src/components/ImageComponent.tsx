import "../css/ImageComponent.css"

export default function Image(props: {imageURL: string}) {

    return(
        <img src={props.imageURL} className="image"></img>
    )
}