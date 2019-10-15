import React, { Component } from "react";
import { ITask } from "../../models/task.model";
import ToDoList from "./ToDoList/ToDoList";
import "./ToDoListWrapper.scss";
import ConsumerWrapper from "../Context/ConsumerWrapper";
import { ToDoListHeader } from "./ToDoListHeader/ToDoListHeader";

interface IProps {
  selectedDate: Date;
  tasks: ITask[];
  isViewAll: boolean;
  getTasks(selectedDate: Date): void;
  getAllTasks(): void;
}

class ToDoListWrapper extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  componentWillReceiveProps(nextProps: IProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div className="today to-do-card h-100 rounded">
        <ToDoListHeader {...this.props} />
        <ToDoList {...this.props} />
      </div>
    );
  }
}

export default ConsumerWrapper(ToDoListWrapper);
