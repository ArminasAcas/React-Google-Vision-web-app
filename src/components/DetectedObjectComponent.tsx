import "../css/DetectedObjectComponent.css"

export default function DetectedObject(props: {objectName: string, objectScore: string}) {

    return(
        <div className="object">
            <span className="object__label">{props.objectName}</span>
            <span>{ "(" + props.objectScore + "% Užtikrintumas)"}</span>
        </div>
    )
}