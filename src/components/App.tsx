import * as React from "react";

class App extends React.Component<{}, Istate> {
  state: Istate = {
    task: "",
    tasks: []
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id: this._dateInMilliseconds(),
          value: this.state.task,
          completed: false
        }
      ],
      task: ""
    });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ task: e.target.value });
  };

  handleDelete = (task: ITask): void => {
    console.log(task);
    let filteredTask = this.state.tasks.filter(
      (tasks: ITask) => tasks.id !== task.id
    );
    this.setState({ tasks: filteredTask });
  };

  toggleDone = (index: number): void => {
    let task: ITask[] = this.state.tasks.splice(index, 1);
    task[0].completed = !task[0].completed;
    const currentTask = [...this.state.tasks, ...task];
    this.setState({ tasks: currentTask });
  };

  private _dateInMilliseconds = (): number => {
    let date: Date = new Date();
    return date.getTime();
  };

  renderTasks = (): JSX.Element[] => {
    return this.state.tasks.map((task: ITask, index: number) => (
      <li key={task.id}>
        {task.value}{" "}
        <button onClick={() => this.handleDelete(task)}>delete</button>
        <button onClick={() => this.toggleDone(index)}>toggle</button>
      </li>
    ));
  };

  render(): JSX.Element {
    return (
      <div>
        <h1>React TypeScript Webpack Boilerplate</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="add a task"
            name="task"
            onChange={this.handleInputChange}
            value={this.state.task}
          />
          <button type="submit">Add a task</button>
        </form>
        <section>
          <h2>Tasks</h2>
          {this.renderTasks()}
        </section>
      </div>
    );
  }
}

interface Istate {
  task: string;
  tasks: Array<ITask>;
}
interface ITask {
  id: number;
  value: string;
  completed: boolean;
}

export default App;
