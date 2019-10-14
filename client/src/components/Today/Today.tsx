import React, { Component } from "react";
import { DatePicker, DatePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import { ITask } from "../../models/task.model";
import ToDoList from "./ToDoList/ToDoList";
import "./Today.scss";
import { Switch, SwitchChangeEvent } from "@progress/kendo-react-inputs";
import ConsumerWrapper from "../Context/ConsumerWrapper";

interface IState {
  isViewAll: boolean;
}

interface IProps {
  selectedDate: Date;
  tasks: ITask[];
  getTasks(selectedDate: Date): void;
  getAllTasks(): void;
}

class Today extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isViewAll: false
    };
  }

  componentWillReceiveProps(nextProps: IProps) {
    console.log(nextProps);
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
    const { isViewAll } = this.state;
    const { selectedDate } = this.props;
    return (
      <div className="today to-do-card h-100 rounded">
        <header className="d-flex align-items-center p-1">
          <a className="nav prev" onClick={() => this.setDate(-1)}>
            <i className="fas fa-caret-left" />
          </a>
          <div className="col">
            <DatePicker
              onChange={this.handleDateChange}
              format="dd/MMMM/yyyy"
              value={selectedDate}
            />
            <div className="switch">
              <Switch onChange={this.handleSwitch} checked={isViewAll} />
              <span className="viewAll">View All</span>
            </div>
          </div>
          <a className="nav next" onClick={() => this.setDate(1)}>
            <i className="fas fa-caret-right" />
          </a>
        </header>
        <div className="row m-0" style={{ height: "calc(100% - 40px)" }}>
          <ToDoList isViewAll={isViewAll} {...this.props} />
        </div>
      </div>
    );
  }
}

export default ConsumerWrapper(Today);
