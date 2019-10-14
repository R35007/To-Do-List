import React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { ITask } from "src/models/task.model";
import "./ToDoListEditForm.scss";
import StatusSwitch from "./StatusSwitch";
import { Status } from "../../../../enum/status.enum";
import { convertDateToTime } from "src/assets/utils/utils";

interface IProps {
  dataItem: ITask;
  selectedDate: Date;
  save(): void;
  cancel(): void;
}

interface IState {
  task: ITask;
}

export default class ToDoListEditForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      task: this.props.dataItem || null
    };
  }

  handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.save();
  };

  componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      task: nextProps.dataItem
    });
  }

  onDialogInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let target = event.target;
    const value = target.value;
    const name = target.name || "";

    const edited = this.state.task;
    edited[name] = value;

    this.setState({
      task: edited
    });
  };

  onStatusChange = (status: string) => {
    const { selectedDate } = this.props;

    const selectedDateStr = selectedDate.toUTCString();
    const editedTask = this.state.task;
    const editedTaskInProgressTime = convertDateToTime(editedTask.inProgressOn);
    const editedTaskInOpenTime = convertDateToTime(editedTask.openOn);
    const selectedDateTime = convertDateToTime(selectedDateStr);
    if (editedTaskInProgressTime <= selectedDateTime && editedTaskInOpenTime <= selectedDateTime) {
      editedTask.status = status;
      if (status == Status.DONE) {
        editedTask.doneOn = selectedDateStr;
        editedTask.doneOnTime = selectedDateTime;
      } else if (status == Status.OPEN) {
        editedTask.openOn = selectedDateStr;
        editedTask.openOnTime = selectedDateTime;
      } else {
        editedTask.inProgressOn = selectedDateStr;
        editedTask.inProgressOnTime = selectedDateTime;
      }
      this.setState({
        task: editedTask
      });
    }
  };

  dialogTitle() {
    return `${this.state.task!.id === undefined ? "Add" : "Edit"} Task`;
  }

  render() {
    const { task } = this.state;
    return (
      <Dialog onClose={this.props.cancel} width={"80%"} title={this.dialogTitle()}>
        <form id="task-form" className="task-form" onSubmit={this.handleOnSubmit}>
          <div>
            <label>
              Task Name
              <br />
              <Input
                required={true}
                type="text"
                name="name"
                value={task.name || ""}
                onChange={this.onDialogInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Task Description
              <br />
              <textarea
                required={true}
                name="description"
                value={task.description || ""}
                onChange={this.onDialogInputChange}
              />
            </label>
          </div>
          <div>
            <label style={{ width: "auto" }}>
              Status :
              <StatusSwitch onChange={this.onStatusChange} status={task.status || Status.OPEN} />
              <br />
            </label>
          </div>
          <div>
            <label>
              Open On : {task.openOn}
              <br />
            </label>
          </div>
          {task.inProgressOn && (
            <div>
              <label>
                In Progress On : {task.inProgressOn}
                <br />
              </label>
            </div>
          )}
          {task.doneOn && (
            <div>
              <label>
                Done On : {task.doneOn}
                <br />
              </label>
            </div>
          )}
        </form>
        <DialogActionsBar>
          <button type="button" className="k-button" onClick={this.props.cancel}>
            Cancel
          </button>
          <button type="submit" form="task-form" className="k-button k-primary">
            Save
          </button>
        </DialogActionsBar>
      </Dialog>
    );
  }
}
