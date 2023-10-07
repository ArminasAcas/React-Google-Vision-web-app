import "../css/DetectedObjectComponent.css"

export default function DetectedObject(props: {objectName: string, objectScore: string}) {

    return(
        <div className="object">
            <span>{props.objectName}</span>
            <span>{props.objectScore + "% Užtikrintumas"}</span>
        </div>
    )
}