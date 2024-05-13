import { Component } from "react";
import { v4 as uuid } from "uuid";

const tagsList = [
  {
    optionId: "HEALTH",
    displayText: "Health",
  },
  {
    optionId: "EDUCATION",
    displayText: "Education",
  },
  {
    optionId: "ENTERTAINMENT",
    displayText: "Entertainment",
  },
  {
    optionId: "SPORTS",
    displayText: "Sports",
  },
  {
    optionId: "TRAVEL",
    displayText: "Travel",
  },
  {
    optionId: "OTHERS",
    displayText: "Others",
  },
];

class App extends Component {
  state = {
    tagsl: tagsList,
    tasksl: [],
    inputTask: "",
    inputTag: "Health",
    activeTab: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputTag, inputTask } = this.state;
    const task = { task: inputTask, tag: inputTag };
    this.setState((prev) => ({
      tasksl: [...prev.tasksl, task],
      inputTag: "Health",
      inputTask: "",
    }));
  };

  renderTasks = () => {
    const { tasksl } = this.state;
    return (
      <ul>
        {tasksl.map((each) => (
          <li key={uuid()}>
            <p>{each.task}</p>
            <p>{each.tag}</p>
          </li>
        ))}
      </ul>
    );
  };

  handleTag = (id) => {
    console.log(id);
    const { tasksl } = this.state;
    const updatedList = tasksl.filter(
      (each) => each.tag.toLowerCase() === id.toLowerCase()
    );
    console.log(updatedList);
    this.setState({
      tasksl: updatedList,
    });
  };

  render() {
    const { tagsl, tasksl, inputTask, inputTag } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Create a task!</h1>
          <p>add your tasks here based on the tags</p>
          <div>
            <label htmlFor="task">Task</label>
            <input
              id="task"
              type="text"
              placeholder="Enter the task here"
              value={inputTask}
              onChange={(e) => this.setState({ inputTask: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="tags">Tags</label>
            <select
              id="tags"
              value={inputTag}
              onChange={(e) => this.setState({ inputTag: e.target.value })}
            >
              {tagsl.map((each) => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </div>
        </form>
        <div>
          <h1>Tags</h1>
          <ul>
            {tagsl.map((each) => (
              <li key={each.optionId}>
                <button
                  type="button"
                  onClick={() => this.handleTag(each.optionId)}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
          <div>
            <h1>Tasks</h1>
            <ul>
              {tasksl.length > 0 ? (
                this.renderTasks()
              ) : (
                <p>No Tasks Added Yet</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
