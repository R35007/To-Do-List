import React from "react";
import { TasksConsumer } from "./TasksContext";

const ConsumerWrapper = (Component: React.ComponentType) =>
  class WrapperComponent extends React.Component<any, {}> {
    constructor(props: any) {
      super(props);
    }

    render() {
      return (
        <TasksConsumer>{(props: any) => <Component {...props} {...this.props} />}</TasksConsumer>
      );
    }
  };

export default ConsumerWrapper;
