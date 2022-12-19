export default function MessageBox(props) {

    return <div className="message-box" onClick={props.func}>
        <img className="img-fluid" src={props.image} alt="profile image"/>
        <div className="message-content">
            <div className="message-header">
                <div className="name">
                    {props.name}
                </div>
            </div>
        </div>
    </div>
}