import React from "react";
import { TasksConsumer } from "./TasksContext";

const ConsumerWrapper = (Component: React.ComponentType<any>) =>
  class WrapperComponent extends React.Component<any> {
    render() {
      return (
        <TasksConsumer>{(props: any) => <Component {...props} {...this.props} />}</TasksConsumer>
      );
    }
  };

export default ConsumerWrapper;
