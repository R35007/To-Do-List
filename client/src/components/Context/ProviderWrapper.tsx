import React from "react";
import { TasksProvider } from "./TasksContext";
import { ITask } from "src/models/task.model";

interface IState {
  selectedDate: Date;
  tasks: ITask[];
  filteredTasks: ITask[];
  isViewAll: boolean;
}

const ProviderWrapper = (Component: React.ComponentType) =>
  class WrapperComponent extends React.Component<any, IState> {
    constructor(props: any) {
      super(props);
      this.state = {
        selectedDate: new Date(),
        tasks: [],
        filteredTasks: [],
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
            filteredTasks: [...tasks],
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
            filteredTasks: [...tasks],
            isViewAll: true
          });
        });
    };

    setFilteredTask = (filteredTasks: ITask[]) => {
      this.setState({ filteredTasks });
    };

    getStore = () => {
      return {
        ...this.state,
        getTasks: this.getTasks,
        getAllTasks: this.getAllTasks,
        setFilteredTask: this.setFilteredTask
      };
    };

    render() {
      return (
        <TasksProvider value={this.getStore()}>
          <Component />
        </TasksProvider>
      );
    }
  };

export default ProviderWrapper;
