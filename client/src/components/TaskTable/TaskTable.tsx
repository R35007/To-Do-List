import React from "react";
import { Grid, GridColumn, GridCellProps, GridRowClickEvent } from "@progress/kendo-react-grid";
import TaskEditForm from "./TaskEditForm/TaskEditForm";
import { ITask } from "src/models/task.model.js";
import axios from "axios";
import "./taskTable.scss";
import { Status } from "../../enum/status.enum";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { getTimes, convertDateToTime } from "src/assets/utils/utils";

interface IProps {
  tasks: ITask[];
  selectedDate: Date;
  getTasks(selectedDate: Date): void;
}

interface IState {
  tasks: ITask[];
  taskInEdit: ITask | undefined;
  deletableTask: ITask | undefined;
}

class TaskTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      tasks: this.props.tasks,
      taskInEdit: undefined,
      deletableTask: undefined
    };
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      tasks: nextProps.tasks
    });
  }

  edit = ({ dataItem }: GridRowClickEvent) => {
    this.setState({ taskInEdit: { ...dataItem } });
  };

  remove = (dataItem: ITask) => {
    const { selectedDate, getTasks } = this.props;
    dataItem.deletedOn = selectedDate.toUTCString();
    axios
      .delete("tasks", { data: dataItem })
      .then(() => getTasks(selectedDate))
      .catch((err: any) => console.log(err));
    this.cancel();
  };

  save = () => {
    const dataItem = this.state.taskInEdit!;
    const { selectedDate, getTasks } = this.props;

    if (dataItem.id) {
      axios
        .put("tasks", dataItem)
        .then(_res => getTasks(selectedDate))
        .catch(err => console.log(err));
    } else {
      axios
        .post("tasks", dataItem)
        .then(_res => getTasks(selectedDate))
        .catch(err => console.log(err));
    }
    this.cancel();
  };

  cancel = () => {
    this.setState({ taskInEdit: undefined, deletableTask: undefined });
  };

  insert = () => {
    const { selectedDate } = this.props;
    this.setState({ taskInEdit: { status: "Open", openOn: selectedDate.toUTCString() } as ITask });
  };

  renderStatus = ({ dataItem }: GridCellProps) => {
    const className =
      "status btn text-white rounded " +
      (dataItem.status == Status.OPEN
        ? "bg-info"
        : dataItem.status == Status.INPROGRESS
        ? "bg-warning"
        : "bg-success");
    return (
      <td>
        <span className={className}>{dataItem.status}</span>
        <button className="remove btn" onClick={() => this.setState({ deletableTask: dataItem })}>
          <i className="fas fa-calendar-times" />
        </button>
      </td>
    );
  };

  renderCurrentStatus = ({ dataItem }: GridCellProps) => {
    const { inProgressOnTime, doneOnTime } = getTimes(dataItem);
    const selectedTime = convertDateToTime(this.props.selectedDate);

    const icon =
      doneOnTime === selectedTime && doneOnTime != 0 ? (
        <span className={"today-status text-success"}>
          <i className="fas fa-check-square" />
        </span>
      ) : inProgressOnTime <= selectedTime && inProgressOnTime != 0 ? (
        <span className={"today-status text-warning"}>
          <i className="fas fa-pen-square" />
        </span>
      ) : (
        <span className={"today-status text-info"}>
          <i className="fas fa-plus-square" />
        </span>
      );
    return (
      <td>
        {icon}
        {dataItem.id}
      </td>
    );
  };

  render() {
    const { taskInEdit, deletableTask } = this.state;
    const { selectedDate } = this.props;
    return (
      <div className="col h-100 p-0" style={{ position: "static" }}>
        <div className="task-table-div h-100">
          <Grid data={this.state.tasks} onRowClick={this.edit} style={{ height: "100%" }}>
            <GridColumn title="Id" width="100px" cell={this.renderCurrentStatus} />
            <GridColumn field="name" title="Task Name" width="150px" />
            <GridColumn field="description" title="Description" />
            <GridColumn field="status" title="Status" width="140px" cell={this.renderStatus} />
          </Grid>
          {taskInEdit && (
            <TaskEditForm
              dataItem={taskInEdit}
              selectedDate={selectedDate}
              save={this.save}
              cancel={this.cancel}
            />
          )}
          {deletableTask && (
            <Dialog title={"Please confirm"} onClose={this.cancel}>
              <p style={{ margin: "25px", textAlign: "center" }}>
                Are you sure you want to remove {deletableTask.name} ?
              </p>
              <DialogActionsBar>
                <button className="k-button" onClick={this.cancel}>
                  No
                </button>
                <button className="k-button" onClick={() => this.remove(deletableTask)}>
                  Yes
                </button>
              </DialogActionsBar>
            </Dialog>
          )}
          <button onClick={this.insert} className="add btn rounded-circle">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
    );
  }
}

export default TaskTable;
