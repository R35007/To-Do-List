import React from "react";
import { Status } from "../../../enum/status.enum";

interface IProps {
  status: string;
  onChange(status: string): void;
  isStatusEditable(): boolean;
}

export function StatusSwitch({ status, onChange, isStatusEditable }: IProps) {
  switch (status) {
    case Status.DONE:
      return (
        <button
          type="button"
          onClick={() => onChange(Status.OPEN)}
          className="status btn bg-success text-white rounded"
          disabled={!isStatusEditable()}
        >
          {Status.DONE}
        </button>
      );
    case Status.INPROGRESS:
      return (
        <button
          type="button"
          onClick={() => onChange(Status.DONE)}
          className="status btn bg-warning text-white rounded"
          disabled={!isStatusEditable()}
        >
          {Status.INPROGRESS}
        </button>
      );
    default:
      return (
        <button
          type="button"
          onClick={() => onChange(Status.INPROGRESS)}
          className="status btn bg-info text-white rounded"
          disabled={!isStatusEditable()}
        >
          {Status.OPEN}
        </button>
      );
  }
}
