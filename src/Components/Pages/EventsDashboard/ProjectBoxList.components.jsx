import ProjectBox from "./projectBox.components";
import noResult from "../../../img/event-alert.gif";

export default function ProjectBoxList(props) {
  return (
    <>
      {props.eventsProp.length > 0 ? (
        props.eventsProp.map((event) => (
          <ProjectBox
            key={event["event_id"]}
            eventName={event["event_name"]}
            startTime={event["start_time"]}
            endTime={event["end_time"]}
            date={event["start_date"]}
            description={event["description"]}
            organizers={event["organizers"]}
          />
        ))
      ) : (
        <div className="d-flex flex-column align-items-center mt-5">
          <img width="300" height="300" src={noResult} />
          <h5 className="mt-3 text-capitalize">
            Looks like there are no current events available
          </h5>
        </div>
      )}
    </>
  );
}
