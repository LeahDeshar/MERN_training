import "./Task.css";

const STATUS = "PlANNED";
export default function Task({ title }) {
  return (
    <div className="task">
      <div>{title}</div>
      <div className="bottomWrapper">
        <div></div>
        <div className={classNames("status", STATUS)}>{STATUS}</div>
        {/* <div className={classNames}></div> */}
      </div>
    </div>
  );
}
