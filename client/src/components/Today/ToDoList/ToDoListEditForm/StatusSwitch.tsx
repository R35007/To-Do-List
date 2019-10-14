import React from "react";
import { Status } from "../../../../enum/status.enum";

interface IProps {
  status: string;
  onChange(status: string): void;
}

function StatusSwitch({ status, onChange }: IProps) {
  switch (status) {
    case Status.DONE:
      return <span className="status bg-success btn text-white ml-3 rounded">{Status.DONE}</span>;
    case Status.INPROGRESS:
      return (
        <button
          type="button"
          onClick={() => onChange(Status.DONE)}
          className="status btn bg-warning text-white ml-3 rounded"
        >
          {Status.INPROGRESS}
        </button>
      );
    default:
      return (
        <button
          type="button"
          onClick={() => onChange(Status.INPROGRESS)}
          className="status tbn bg-info text-white ml-3 rounded"
        >
          {Status.OPEN}
        </button>
      );
  }
}

export default StatusSwitch;
