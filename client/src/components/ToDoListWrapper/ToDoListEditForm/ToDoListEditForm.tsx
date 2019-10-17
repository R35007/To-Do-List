import React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { ITask } from "../../../models/task.model";
import "./ToDoListEditForm.scss";
import StatusSwitch from "./StatusSwitch";
import { Status } from "../../../enum/status.enum";
import { convertDateNumberToTime } from "../../../assets/utils/utils";

interface IProps {
  task: ITask;
  selectedDate: Date;
  save(task: ITask): void;
  cancel(): void;
}

interface IState {
  task: ITask;
}

export default class ToDoListEditForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      task: this.props.task || null
    };
  }

  handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.save(this.state.task);
  };

  componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      task: nextProps.task
    });
  }

  onDialogInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let target = event.target;
    let value = target.value;
    const name = target.name || "";

    const edited = this.state.task;
    edited[name] = value;

    this.setState({
      task: edited
    });
  };

  isStatusEditable = () => {
    const editedTask = this.state.task;
    const { selectedDate } = this.props;
    const selectedDateTime = convertDateNumberToTime(selectedDate.getTime());

    const { openOnTime, inProgressOnTime = 0 } = editedTask;

    return !(selectedDateTime < openOnTime) && !(selectedDateTime < inProgressOnTime);
  };

  onStatusChange = (status: string) => {
    const { selectedDate, task } = this.props;
    const editedTask = { ...this.state.task };

    const selectedDateStr = selectedDate.toLocaleString();
    const selectedDateTime = convertDateNumberToTime(selectedDate.getTime());
    editedTask.status = status;
    if (status === Status.DONE) {
      editedTask.doneOn = task.deletedOn || selectedDateStr;
      editedTask.doneOnTime = task.deleteOnTime || selectedDateTime;
      editedTask.priority = 4;
    } else if (status === Status.OPEN) {
      editedTask.openOn = task.openOn || selectedDateStr;
      editedTask.openOnTime = task.openOnTime || selectedDateTime;
      delete editedTask.inProgressOn;
      delete editedTask.inProgressOnTime;
      delete editedTask.doneOn;
      delete editedTask.doneOnTime;
    } else {
      editedTask.inProgressOn = task.inProgressOn || selectedDateStr;
      editedTask.inProgressOnTime = task.inProgressOnTime || selectedDateTime;
      delete editedTask.doneOn;
      delete editedTask.doneOnTime;
    }

    this.setState({
      task: editedTask
    });
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
            <div className="row">
              <div className="col-4">
                <label>
                  Priority :
                  <select
                    name="priority"
                    className="priority"
                    onChange={this.onDialogInputChange}
                    value={task.priority}
                  >
                    <option value="1">H</option>
                    <option value="2">M</option>
                    <option value="3">L</option>
                    <option value="4">N</option>
                  </select>
                  <br />
                </label>
              </div>
              <div className="col-6">
                <label style={{ width: "auto" }}>
                  Status :
                  <StatusSwitch
                    onChange={this.onStatusChange}
                    status={task.status || Status.OPEN}
                    isStatusEditable={this.isStatusEditable}
                  />
                  <br />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label>
              Open On : {task.openOn}
              <br />
            </label>
          </div>
          <div>
            <label>
              In Progress On : {task.inProgressOn}
              <br />
            </label>
          </div>
          <div>
            <label>
              Done On : {task.doneOn}
              <br />
            </label>
          </div>
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
