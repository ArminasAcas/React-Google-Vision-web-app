import "../css/InformationComponent.css"

export default function InformationBlock(props: {informationText: string}) {

    return(
        <div className="info-block">
            <span>{props.informationText}</span>
        </div>
    )
}