import React from "react";

const TasksContext = React.createContext({});
const TasksProvider = TasksContext.Provider;
const TasksConsumer = TasksContext.Consumer;

export { TasksProvider, TasksConsumer };
export default TasksContext;
