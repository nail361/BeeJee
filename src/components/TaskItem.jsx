import React, { PureComponent } from 'react';

export class TaskItem extends PureComponent {
  render() {
    const { task } = this.props;

    return (
      <div>
        {task.text}
      </div>
    )
  }
}

export default TaskItem;
