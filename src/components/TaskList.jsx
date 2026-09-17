import { Component } from "react";

export class TaskList extends Component {
  static tasks = [];

  handleAddTask = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const text = new FormData(form).get("task").trim();

    if (!text) {
      return;
    }

    TaskList.tasks.push({
      id: Date.now(),
      text,
    });
    form.reset();
    this.forceUpdate();
  };

  handleDeleteTask = (taskId) => {
    const taskIndex = TaskList.tasks.findIndex(({ id }) => id === taskId);

    if (taskIndex !== -1) {
      TaskList.tasks.splice(taskIndex, 1);
      this.forceUpdate();
    }
  };

  render() {
    return (
      <section className="task-list" aria-labelledby="tasks-title">
        <div className="task-list__header">
          <div>
            <h1 id="tasks-title">Мої завдання</h1>
          </div>
        </div>

        <form className="task-form" onSubmit={this.handleAddTask}>
          <input
            id="task-input"
            name="task"
            type="text"
            placeholder="Додайте нове завдання"
            autoComplete="off"
          />
          <button type="submit">Додати</button>
        </form>

        {TaskList.tasks.length > 0 ? (
          <ul className="tasks">
            {TaskList.tasks.map((task, index) => (
              <li className="task" key={task.id}>
                <span>{index + 1}. {task.text}</span>
                <button
                  type="button"
                  className="task__delete"
                  onClick={() => this.handleDeleteTask(task.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="tasks__empty">Список завдань порожній.</p>
        )}
      </section>
    );
  }
}
