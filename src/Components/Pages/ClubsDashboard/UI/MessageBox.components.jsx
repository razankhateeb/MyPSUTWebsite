import EditClub from "../editClub";
import {useState} from "react";

export default function MessageBox(props) {
    const [modalEditClubShow, setModalEditClubShow] = useState(false);

    return <>
        <div className="message-box" onClick={() => setModalEditClubShow(true)}>
            <img className="img-fluid" src={`http://localhost:8000/${props.image}`} alt="profile image"/>
            <div className="message-content">
                <div className="message-header">
                    <div className="name">
                        {props.name}
                    </div>
                </div>
            </div>
        </div>
        <EditClub
            show={modalEditClubShow}
            onHide={() => setModalEditClubShow(false)}
            data={props.value}
            fetchClubsHandler={props.fetchClubsHandler}
        ></EditClub>
    </>

}