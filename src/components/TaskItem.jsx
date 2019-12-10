import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const getStatus = (status, fun) => {
  return <input type="checkbox" onChange={fun} checked={status === 10} />;
};

export class TaskItem extends PureComponent {

  onStatusChange() {
    console.log("you are not admin");
  }

  render() {
    const { task } = this.props;

    return (
      <div className="task-list__task-item">
        <div>{task.id}</div>
        <div>{task.username}</div>
        <div>{task.email}</div>
        <div>{task.text}</div>
        <div>{getStatus(task.status, this.onStatusChange)}</div>
      </div>
    )
  }
}

export default TaskItem;

TaskItem.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
};
