import React, { PureComponent } from 'react';

const getStatus = (status) => {
  return status === 10 ? 'complete' : 'incomplete';
};

export class TaskItem extends PureComponent {
  render() {
    const { task } = this.props;

    return (
      <div className="task-list__task-item">
        <div>{task.username}</div>
        <div>{task.email}</div>
        <div>{task.text}</div>
        <div>{getStatus(task.status)}</div>
      </div>
    )
  }
}

export default TaskItem;
