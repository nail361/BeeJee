import React, { PureComponent } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { TaskItem } from './TaskItem';
import { getTasks } from '../utils/help';

import '../styles/Tasks.scss';

const getFiledClass = (orderField, sortDirection, field) => {
  let className = '';
  if (orderField === field) {
    className += `active ${sortDirection}`;
  }
  return className;
};

export class TaskList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pagesCount: 0,
    };
  }

  componentDidMount() {
    this.fillTasks();
  }

  fillTasks() {
    const {
      setLoading,
      orderField,
      sortDirection,
      curPage,
    } = this.props;

    setLoading(true);

    getTasks(orderField, sortDirection, curPage).then((data) => {
      if (data.status === 'ok') {
        const { addTasks, pageSize } = this.props;

        this.setState({
          pagesCount: Math.ceil(data.message.total_task_count / pageSize),
        });

        addTasks(data.message.tasks, data.message.total_task_count);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }

  handlePageClick(data) {
    const page = data.selected;
    const { changePage } = this.props;

    changePage(page + 1).then(() => this.fillTasks());
  }

  changeOrder(field) {
    const { orderField, changeOrder, changeSortDirection } = this.props;

    if (orderField === field) changeSortDirection().then(() => this.fillTasks());
    else changeOrder(field).then(() => this.fillTasks());
  }

  render() {
    const { tasks, orderField, sortDirection } = this.props;
    const { pagesCount } = this.state;

    return (
      <>
        <div className="order">
          {/* <div
            className={getFiledClass(orderField, sortDirection, 'id')}
            onClick={() => this.changeOrder('id')}
          >
            id
          </div> */}
          <div
            className={getFiledClass(orderField, sortDirection, 'username')}
            onClick={() => this.changeOrder('username')}
          >
            имя пользователя
          </div>
          <div
            className={getFiledClass(orderField, sortDirection, 'email')}
            onClick={() => this.changeOrder('email')}
          >
            email
          </div>
          <div>текст задачи</div>
          <div
            className={getFiledClass(orderField, sortDirection, 'status')}
            onClick={() => this.changeOrder('status')}
          >
            статус
          </div>
        </div>
        <div className="tasks-list">
          {
            tasks.map((task) => <TaskItem key={task.id} task={task} {...this.props} />)
          }
        </div>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pagesCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={(data) => this.handlePageClick(data)}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </>
    );
  }
}

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number.isRequired,
  setLoading: PropTypes.func.isRequired,
  addTasks: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  changeOrder: PropTypes.func.isRequired,
  changeSortDirection: PropTypes.func.isRequired,
  curPage: PropTypes.number.isRequired,
  orderField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
};
