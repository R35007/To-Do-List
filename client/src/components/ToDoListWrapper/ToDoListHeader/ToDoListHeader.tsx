import React, { Component } from "react";
import { DatePicker, DatePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import { Switch, SwitchChangeEvent, Input } from "@progress/kendo-react-inputs";
import { ITask } from "../../../models/task.model";
import { IProviderProps } from "../../../models/providerProps.model";

interface IState {
  isViewAll: boolean;
}

export class ToDoListHeader extends Component<IProviderProps, IState> {
  constructor(props: IProviderProps) {
    super(props);

    this.state = { isViewAll: false };
  }

  handleSwitch = (event: SwitchChangeEvent) => {
    const isViewAll = event.target.value;
    this.setState({ isViewAll });
    isViewAll ? this.props.getAllTasks() : this.props.getTasks(this.props.selectedDate);
  };

  handleDateChange = ({ value }: DatePickerChangeEvent) => {
    if (value) {
      this.state.isViewAll ? this.props.getAllTasks() : this.props.getTasks(value);
    }
  };

  getValues(task: ITask) {
    return Object.entries(task).map(([key, val]: [string, any]) => {
      if (["openOnTime", "doneOnTime", "inProgressOnTime"].includes(key)) {
        val = new Date(val).toLocaleDateString();
      }
      val = val.toString().toLowerCase();
      return val;
    });
  }

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { tasks, setFilteredTask } = this.props;
    const value = event.target.value.toLowerCase();

    let filteredTasks = [] as ITask[];
    console.log(value);

    if (value.length) {
      filteredTasks = tasks.filter(task => this.getValues(task).find(val => val.includes(value)));
    } else {
      filteredTasks = this.props.tasks;
    }
    setFilteredTask(filteredTasks);
  };

  setDate = (index: number) => {
    const newDate = this.props.selectedDate;
    newDate.setDate(newDate.getDate() + index);
    this.state.isViewAll ? this.props.getAllTasks() : this.props.getTasks(newDate);
  };
  render() {
    const { selectedDate } = this.props;
    const { isViewAll } = this.state;
    return (
      <header className="d-flex align-items-center p-1">
        <span className="nav prev" onClick={() => this.setDate(-1)}>
          <i className="fas fa-caret-left" />
        </span>
        <div className="col">
          <DatePicker onChange={this.handleDateChange} format="dd/MMMM/yyyy" value={selectedDate} />
          <div className="switch">
            <Switch onChange={this.handleSwitch} checked={isViewAll} />
            <span className="viewAll">View All</span>
          </div>
          <div className="search float-right">
            <i className="icon fas fa-search" />
            <Input onChange={this.handleSearch} />
          </div>
        </div>
        <span className="nav next" onClick={() => this.setDate(1)}>
          <i className="fas fa-caret-right" />
        </span>
      </header>
    );
  }
}

export default ToDoListHeader;
