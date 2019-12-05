import React, { PureComponent } from 'react';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

export class TaskList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { tasks } = this.props;

    return (
      <div>
        {
          tasks.map((task) => {
            return <TaskItem key={task.id} task={task} />;
          })
        }
      </div>
    );
  }
}

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
