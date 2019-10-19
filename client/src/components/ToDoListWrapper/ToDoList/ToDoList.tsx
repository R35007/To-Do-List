import React from "react";
import { Grid, GridColumn, GridCellProps } from "@progress/kendo-react-grid";
import { ITask } from "../../../models/task.model";
import axios from "axios";
import "./ToDoList.scss";
import { Status } from "../../../enum/status.enum";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { IProviderProps } from "../../../models/providerProps.model";
import { convertDateNumberToTime } from "../../../assets/utils/utils";
import { MyCommandCell } from "./MyCommandCell";
import { DeadLineChart } from "../DeadLineChart/DeadLineChart";
import { StatusSwitch } from "./StatusSwitch";
import { DatePicker, DatePickerChangeEvent } from "@progress/kendo-react-dateinputs";

interface IState {
  tasks: ITask[];
  taskInEdit: ITask | undefined;
  deletableTask: ITask | undefined;
  sort: SortDescriptor[];
  skip: number;
}

class ToDoList extends React.Component<IProviderProps, IState> {
  commandCell;
  deadLineCell;
  constructor(props: IProviderProps) {
    super(props);

    this.state = {
      tasks: [...this.props.filteredTasks],
      deletableTask: undefined,
      skip: 0,
      taskInEdit: undefined,
      sort: [{ field: "priority", dir: "asc" }]
    };

    this.commandCell = MyCommandCell({
      edit: this.edit,
      add: this.add,
      update: this.update,
      confirm: this.confirm,
      discard: this.discard,
      cancel: this.cancel
    });

    this.deadLineCell = DeadLineChart();
  }

  componentWillReceiveProps(nextProps: IProviderProps) {
    this.setState({
      tasks: [...nextProps.filteredTasks],
      taskInEdit: undefined
    });
  }

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let target = event.target;
    let value: any = target.value;
    const name = target.name || "";
    if (name === "priority") {
      value = parseInt(value);
    }
    const edited = this.state.taskInEdit!;
    edited[name] = value;

    this.setState({
      taskInEdit: edited
    });
  };

  onStatusChange = (status: string) => {
    const { selectedDate, tasks } = this.props;
    const editedTask = this.state.taskInEdit!;

    const index = tasks.findIndex(task => task.id === editedTask.id);
    const selectedTask = { ...tasks[index] } || {};

    const selectedDateStr = selectedDate.toLocaleString();
    const selectedDateTime = convertDateNumberToTime(selectedDate.getTime());
    editedTask.status = status;
    if (status === Status.DONE) {
      editedTask.inProgressOn = selectedTask.inProgressOn || selectedDateStr;
      editedTask.inProgressOnTime = selectedTask.inProgressOnTime || selectedDateTime;
      editedTask.doneOn = selectedTask.deletedOn || selectedDateStr;
      editedTask.doneOnTime = selectedTask.deleteOnTime || selectedDateTime;
      editedTask.priority = 4;
    } else if (status === Status.OPEN) {
      editedTask.openOn = selectedTask.openOn || selectedDateStr;
      editedTask.openOnTime = selectedTask.openOnTime || selectedDateTime;
      delete editedTask.inProgressOn;
      delete editedTask.inProgressOnTime;
      delete editedTask.doneOn;
      delete editedTask.doneOnTime;
    } else {
      editedTask.inProgressOn = selectedTask.inProgressOn || selectedDateStr;
      editedTask.inProgressOnTime = selectedTask.inProgressOnTime || selectedDateTime;
      delete editedTask.doneOn;
      delete editedTask.doneOnTime;
    }
    this.setState({
      taskInEdit: editedTask
    });
  };

  onDeadLineChange = ({ value }: DatePickerChangeEvent) => {
    if (value) {
      const taskInEdit = this.state.taskInEdit!;
      taskInEdit.deadLineTime = value.getTime();
      taskInEdit.deadLine = value.toLocaleString();

      this.setState({
        taskInEdit
      });
    }
  };

  clearDeadLine = () => {
    const taskInEdit = this.state.taskInEdit!;
    delete taskInEdit.deadLine;
    delete taskInEdit.deadLineTime;
    this.setState({ taskInEdit });
  };

  edit = (dataItem: ITask) => {
    let { tasks, taskInEdit } = this.state;
    if (!taskInEdit) {
      taskInEdit = { ...dataItem };
      const index = tasks.findIndex(task => task.id === dataItem.id);
      dataItem.inEdit = true;
      tasks[index] = dataItem;
      this.setState({ tasks, taskInEdit });
    }
  };

  remove = (dataItem: ITask) => {
    const { isViewAll, selectedDate, getTasks, getAllTasks } = this.props;
    dataItem.deletedOn = selectedDate.toLocaleString();
    dataItem.deleteOnTime = selectedDate.getTime();
    console.log(dataItem);

    axios
      .delete("tasks", { data: dataItem })
      .then(() => (isViewAll ? getAllTasks() : getTasks(selectedDate)))
      .catch((err: any) => console.log(err));
    this.cancel();
  };

  confirm = (dataItem: ITask) => {
    this.setState({ deletableTask: dataItem });
  };

  addNew = () => {
    const newDataItem = this.newTask();
    const taskInEdit = { ...newDataItem };
    delete taskInEdit.inEdit;
    this.setState({
      tasks: [newDataItem, ...this.state.tasks],
      taskInEdit
    });
  };

  discard = dataItem => {
    const tasks = [...this.state.tasks];
    this.removeItem(tasks, dataItem);
    this.setState({ tasks, taskInEdit: undefined });
  };

  removeItem(data, item) {
    let index = data.findIndex(p => p === item || (item.ProductID && p.ProductID === item.ProductID));
    if (index >= 0) {
      data.splice(index, 1);
    }
  }

  isStatusEditable = () => {
    const editedTask = this.state.taskInEdit!;
    const { selectedDate } = this.props;
    const selectedDateTime = convertDateNumberToTime(selectedDate.getTime());

    const { openOnTime, inProgressOnTime = 0 } = editedTask;

    return !(selectedDateTime < openOnTime) && !(selectedDateTime < inProgressOnTime);
  };

  add = () => {
    const { isViewAll, selectedDate, getTasks, getAllTasks } = this.props;
    const task = this.state.taskInEdit!;
    this.cancel();
    axios
      .post("tasks", task)
      .then(_res => (isViewAll ? getAllTasks() : getTasks(selectedDate)))
      .catch(err => console.log(err));
  };

  update = () => {
    const { isViewAll, selectedDate, getTasks, getAllTasks } = this.props;
    const task = this.state.taskInEdit!;
    this.cancel();
    axios
      .put("tasks", task)
      .then(_res => (isViewAll ? getAllTasks() : getTasks(selectedDate)))
      .catch(err => console.log(err));
  };

  cancel = () => {
    const { tasks } = this.state;
    const data = tasks.map(task => {
      delete task.inEdit;
      return task;
    });
    this.setState({ tasks: data, taskInEdit: undefined, deletableTask: undefined });
  };

  newTask(): ITask {
    const { selectedDate } = this.props;
    return {
      summary: "",
      status: "Open",
      openOn: selectedDate.toLocaleString(),
      openOnTime: convertDateNumberToTime(selectedDate.getTime()),
      priority: 1,
      inEdit: true
    } as ITask;
  }

  renderCurrentStatus = ({ dataItem }: GridCellProps) => {
    const { inProgressOnTime = 0, doneOnTime = 0, openOnTime } = dataItem;
    const selectedTime = convertDateNumberToTime(this.props.selectedDate.getTime());

    const icon =
      (doneOnTime < selectedTime && doneOnTime !== 0) || openOnTime > selectedTime ? (
        <></>
      ) : doneOnTime === selectedTime && doneOnTime !== 0 ? (
        <span className={"today-status text-success"} title={Status.DONE}>
          <i className="fas fa-check-square" />
        </span>
      ) : inProgressOnTime <= selectedTime && inProgressOnTime !== 0 ? (
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

  renderSummary = ({ dataItem }: GridCellProps) => {
    const taskInEdit = this.state.taskInEdit!;
    const inEdit = dataItem.inEdit;

    const cell = inEdit ? <textarea name="summary" required value={taskInEdit.summary} onChange={this.onChangeHandler}></textarea> : dataItem.summary;
    return <td>{cell}</td>;
  };

  renderPriority = ({ dataItem }: GridCellProps) => {
    const taskInEdit = this.state.taskInEdit!;
    const priorityNum = dataItem.priority && dataItem.priority;
    const priority = priorityNum === 1 ? "H" : priorityNum === 2 ? "M" : priorityNum === 3 ? "L" : "N";
    const inEdit = dataItem.inEdit;

    const cell = inEdit ? (
      <select name="priority" value={taskInEdit.priority} onChange={this.onChangeHandler}>
        <option value="1">H</option>
        <option value="2">M</option>
        <option value="3">L</option>
        <option value="4">N</option>
      </select>
    ) : (
      priority
    );
    return <td>{cell}</td>;
  };

  renderShortDate = ({ dataItem, field = "" }: GridCellProps) => {
    const inEdit = dataItem.inEdit;
    const taskInEdit = this.state.taskInEdit;

    const taskInEditDate = taskInEdit && taskInEdit[field] ? new Date(taskInEdit[field]).toLocaleDateString() : "";
    const statusDate = dataItem[field] ? new Date(dataItem[field]).toLocaleDateString() : "";

    const cell = inEdit ? taskInEditDate : statusDate;
    return <td>{cell}</td>;
  };

  renderStatus = ({ dataItem }: GridCellProps) => {
    const taskInEdit = this.state.taskInEdit!;
    const className =
      "status btn text-white rounded " +
      (dataItem.status === Status.OPEN ? "bg-info" : dataItem.status === Status.INPROGRESS ? "bg-warning" : "bg-success");
    const inEdit = dataItem.inEdit;

    const cell = inEdit ? (
      <StatusSwitch status={taskInEdit.status} onChange={this.onStatusChange} isStatusEditable={this.isStatusEditable} />
    ) : (
      <span className={className}>{dataItem.status}</span>
    );

    return <td>{cell}</td>;
  };

  renderDeadLine = ({ dataItem }: GridCellProps) => {
    const inEdit = dataItem.inEdit;
    const taskInEdit = this.state.taskInEdit;
    const deadLine = taskInEdit && taskInEdit.deadLineTime ? new Date(taskInEdit.deadLineTime) : undefined;
    const deadLineStr = dataItem.deadLine ? new Date(dataItem.deadLineTime).toLocaleDateString() : "";
    const cell = inEdit ? (
      <div className="dead-line-picker-div d-flex align-items-center">
        <DatePicker
          width="100%"
          className="dead-line-picker"
          format="dd/MM/yyyy"
          value={deadLine}
          formatPlaceholder="formatPattern"
          onChange={this.onDeadLineChange}
        />
        <i className="fas fa-times p-1" onClick={this.clearDeadLine} />
      </div>
    ) : (
      deadLineStr
    );
    return <td>{cell}</td>;
  };

  render() {
    const { deletableTask, tasks, sort, skip, taskInEdit } = this.state;
    const isAddDisabled = typeof taskInEdit === "object";
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
              scrollable={"virtual"}
              style={{ height: "100%" }}
              onPageChange={event => this.setState({ skip: event.page.skip })}
            >
              <GridColumn field="id" title="Id" width="90px" cell={this.renderCurrentStatus} />
              <GridColumn field="summary" title="Summary" width="300px" cell={this.renderSummary} />
              <GridColumn field="priority" title="P" width="70px" cell={this.renderPriority} />
              <GridColumn field="status" title="Status" width="100px" cell={this.renderStatus} />
              <GridColumn field="deadLine" title="DeadLine" width="120px" cell={this.renderDeadLine} />
              <GridColumn title="Remaining" width="150px" cell={this.deadLineCell} />
              <GridColumn field="openOnTime" title="Open" width="100px" cell={this.renderShortDate} />
              <GridColumn field="inProgressOnTime" title="Progress" width="100px" cell={this.renderShortDate} />
              <GridColumn field="doneOnTime" title="Done" width="100px" cell={this.renderShortDate} />
              <GridColumn width="150px" cell={this.commandCell} locked={true} />
            </Grid>
            {deletableTask && (
              <Dialog title={"Please confirm"} onClose={this.cancel}>
                <p style={{ margin: "25px", textAlign: "center" }}>Are you sure you want to remove {deletableTask.id} ?</p>
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
            <button onClick={this.addNew} disabled={isAddDisabled} className="add btn rounded-circle">
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoList;
