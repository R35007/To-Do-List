import React from "react";
import { Grid, GridColumn, GridCellProps, GridRowClickEvent } from "@progress/kendo-react-grid";
import ToDoListEditForm from "../ToDoListEditForm/ToDoListEditForm";
import { ITask } from "src/models/task.model.js";
import axios from "axios";
import "./ToDoList.scss";
import { Status } from "../../../enum/status.enum";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { IProviderProps } from "src/models/providerProps.model";
import { convertDateNumberToTime } from "src/assets/utils/utils";

interface IState {
  tasks: ITask[];
  taskInEdit: ITask | undefined;
  deletableTask: ITask | undefined;
  sort: SortDescriptor[];
  skip: number;
}

class ToDoList extends React.Component<IProviderProps, IState> {
  constructor(props: IProviderProps) {
    super(props);

    this.state = {
      tasks: this.props.filteredTasks,
      taskInEdit: undefined,
      deletableTask: undefined,
      skip: 0,
      sort: [{ field: "priority", dir: "asc" }, { field: "status", dir: "desc" }]
    };
  }

  componentWillReceiveProps(nextProps: IProviderProps) {
    this.setState({
      tasks: nextProps.filteredTasks
    });
  }

  edit = ({ dataItem }: GridRowClickEvent) => {
    this.setState({ taskInEdit: { ...dataItem } });
  };

  remove = (dataItem: ITask) => {
    const { isViewAll, selectedDate, getTasks, getAllTasks } = this.props;
    dataItem.deletedOn = selectedDate.toLocaleString();
    dataItem.deleteOnTime = selectedDate.getTime();
    axios
      .delete("tasks", { data: dataItem })
      .then(() => (isViewAll ? getAllTasks() : getTasks(selectedDate)))
      .catch((err: any) => console.log(err));
    this.cancel();
  };

  save = (task: ITask) => {
    const { isViewAll, selectedDate, getTasks, getAllTasks } = this.props;

    if (task.id) {
      axios
        .put("tasks", task)
        .then(_res => (isViewAll ? getAllTasks() : getTasks(selectedDate)))
        .catch(err => console.log(err));
    } else {
      axios
        .post("tasks", task)
        .then(_res => (isViewAll ? getAllTasks() : getTasks(selectedDate)))
        .catch(err => console.log(err));
    }
    this.cancel();
  };

  cancel = () => {
    this.setState({ taskInEdit: undefined, deletableTask: undefined });
  };

  insert = () => {
    this.setState({ taskInEdit: this.newTask() as ITask });
  };

  newTask() {
    const { selectedDate } = this.props;
    return {
      status: "Open",
      openOn: selectedDate.toLocaleString(),
      openOnTime: convertDateNumberToTime(selectedDate.getTime())
    };
  }

  renderStatus = ({ dataItem }: GridCellProps) => {
    const className =
      "status btn text-white rounded " +
      (dataItem.status == Status.OPEN
        ? "bg-info"
        : dataItem.status == Status.INPROGRESS
        ? "bg-warning"
        : "bg-success");
    return (
      <td className="position-relative">
        <span className={className}>{dataItem.status}</span>
        <button className="remove btn" onClick={() => this.setState({ deletableTask: dataItem })}>
          <i className="fas fa-calendar-times" />
        </button>
      </td>
    );
  };

  renderCurrentStatus = ({ dataItem }: GridCellProps) => {
    const { inProgressOnTime = 0, doneOnTime = 0, openOnTime } = dataItem;
    const selectedTime = convertDateNumberToTime(this.props.selectedDate.getTime());

    const icon =
      (doneOnTime < selectedTime && doneOnTime != 0) || openOnTime > selectedTime ? (
        <></>
      ) : doneOnTime === selectedTime && doneOnTime != 0 ? (
        <span className={"today-status text-success"} title={Status.DONE}>
          <i className="fas fa-check-square" />
        </span>
      ) : inProgressOnTime <= selectedTime && inProgressOnTime != 0 ? (
        <span className={"today-status text-warning"} title={Status.INPROGRESS}>
          <i className="fas fa-pen-square" />
        </span>
      ) : (
        <span className={"today-status text-info"} title={Status.OPEN}>
          <i className="fas fa-plus-square" />
        </span>
      );
    return (
      <td className="position-relative pl-4">
        {icon}
        {dataItem.id}
      </td>
    );
  };

  renderShortDate = ({ dataItem, field = "" }: GridCellProps) => {
    return <td>{dataItem[field] && new Date(dataItem[field]).toLocaleDateString()}</td>;
  };

  render() {
    const { taskInEdit, deletableTask, tasks, sort, skip } = this.state;
    const { selectedDate } = this.props;
    return (
      <div className="row m-0" style={{ height: "calc(100% - 40px)" }}>
        <div className="col h-100 p-0" style={{ position: "static" }}>
          <div className="todo-table-div h-100">
            <Grid
              data={orderBy(tasks.slice(skip, skip + 20), sort)}
              sortable={{ mode: "multiple" }}
              rowHeight={40}
              pageSize={20}
              total={tasks.length}
              skip={skip}
              sort={sort}
              onSortChange={e => this.setState({ sort: e.sort })}
              onRowClick={this.edit}
              scrollable={"virtual"}
              style={{ height: "100%" }}
              onPageChange={event => this.setState({ skip: event.page.skip })}
            >
              <GridColumn field="id" title="Id" width="90px" cell={this.renderCurrentStatus} />
              <GridColumn field="name" title="Name" width="100px" />
              <GridColumn field="description" title="Description" />
              <GridColumn field="priority" title="P" width="50px" />
              <GridColumn
                field="openOnTime"
                title="Open"
                width="110px"
                cell={this.renderShortDate}
              />
              <GridColumn
                field="inProgressOnTime"
                title="InProgress"
                width="110px"
                cell={this.renderShortDate}
              />
              <GridColumn
                field="doneOnTime"
                title="Done"
                width="110px"
                cell={this.renderShortDate}
              />
              <GridColumn field="status" title="Status" width="130px" cell={this.renderStatus} />
            </Grid>
            {taskInEdit && (
              <ToDoListEditForm
                task={taskInEdit}
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
      </div>
    );
  }
}

export default ToDoList;
