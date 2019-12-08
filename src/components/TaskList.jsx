import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TaskItem } from './TaskItem';
import { getTasks } from '../utils/help';

import '../styles/Tasks.scss';

export class TaskList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { curPage } = this.props;

    getTasks('id', 'asc', curPage).then((data) => {
      if (data.status === 'ok') {
        const { addTasks } = this.props;
        addTasks(data.message.tasks, data.message.total_task_count);
      }
    }).catch((error) => console.error(error));
  }

  changePage(page) {
    const { changePage } = this.props;
    changePage(page);
  }

  render() {
    const {
      tasks,
      totalTaskCount,
      pageSize,
      curPage,
    } = this.props;

    const pagesCount = Math.ceil(totalTaskCount / pageSize);

    const pageArr = [];
    for (let index = 0; index < pagesCount; index++) {
      pageArr.push(index);
    }

    return (
      <>
        <div className="order">
          <div>имя пользователя</div>
          <div>email</div>
          <div>текст задачи</div>
          <div>статус</div>
        </div>
        <div className="tasks-list">
          {
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
          }
        </div>
        <div className="pagination">
          {pageArr.map((index) => {
            return (
              <button
                type="button"
                key={index}
                className={curPage === index ? 'selected' : ''}
                onClick={() => this.changePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </>
    );
  }
}

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
