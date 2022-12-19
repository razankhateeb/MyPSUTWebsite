import ProjectBox from "./projectBox.components";

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
          />
        ))
      ) : (
        <>No Events</>
      )}
    </>
  );
}
