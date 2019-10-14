import React from "react";
import { TasksProvider } from "./TasksContext";
import { ITask } from "src/models/task.model";

interface IState {
  selectedDate: Date;
  tasks: ITask[];
  isViewAll: boolean;
}

const ProviderWrapper = (Component: React.ComponentType) =>
  class WrapperComponent extends React.Component<any, IState> {
    constructor(props: any) {
      super(props);
      this.state = {
        selectedDate: new Date(),
        tasks: [],
        isViewAll: false
      };
    }

    componentDidMount() {
      this.getTasks(new Date());
    }

    getTasks = (selectedDate: Date) => {
      const time = selectedDate.getTime();
      fetch(`tasks/${time}`)
        .then(res => res.json())
        .then((tasks: ITask[]) => {
          this.setState({
            ...this.state,
            selectedDate,
            tasks,
            isViewAll: false
          });
        });
    };

    getAllTasks = () => {
      fetch(`tasks/all`)
        .then(res => res.json())
        .then((tasks: ITask[]) => {
          this.setState({
            ...this.state,
            tasks,
            isViewAll: true
          });
        });
    };

    render() {
      return (
        <TasksProvider
          value={{ ...this.state, getTasks: this.getTasks, getAllTasks: this.getAllTasks }}
        >
          <Component />
        </TasksProvider>
      );
    }
  };

export default ProviderWrapper;
