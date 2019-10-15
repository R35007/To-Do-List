import React, { Component } from "react";
import { DatePicker, DatePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import { Switch, SwitchChangeEvent, Input } from "@progress/kendo-react-inputs";
import { ITask } from "src/models/task.model";

interface IState {
  isViewAll: boolean;
}

interface IProps {
  selectedDate: Date;
  tasks: ITask[];
  getTasks(selectedDate: Date): void;
  getAllTasks(): void;
}

export class ToDoListHeader extends Component<IProps, IState> {
  constructor(props: IProps) {
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
        <a className="nav prev" onClick={() => this.setDate(-1)}>
          <i className="fas fa-caret-left" />
        </a>
        <div className="col">
          <DatePicker onChange={this.handleDateChange} format="dd/MMMM/yyyy" value={selectedDate} />
          <div className="switch">
            <Switch onChange={this.handleSwitch} checked={isViewAll} />
            <span className="viewAll">View All</span>
          </div>
        </div>
        <a className="nav next" onClick={() => this.setDate(1)}>
          <i className="fas fa-caret-right" />
        </a>
      </header>
    );
  }
}

export default ToDoListHeader;
