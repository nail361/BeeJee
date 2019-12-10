import React, { PureComponent } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { TaskItem } from './TaskItem';
import { getTasks } from '../utils/help';

import '../styles/Tasks.scss';

export class TaskList extends PureComponent {
  constructor(props) {
    super(props);

    const {
      totalTaskCount,
      pageSize,
    } = this.props;

    this.state = {
      pagesCount: Math.ceil(totalTaskCount / pageSize),
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

    console.log(curPage);
    
    return;

    setLoading(true);

    getTasks(orderField, sortDirection, curPage).then((data) => {
      if (data.status === 'ok') {
        const { addTasks } = this.props;
        addTasks(data.message.tasks, data.message.total_task_count);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }

  handlePageClick(data) {
    const page = data.selected;
    const { changePage } = this.props;
    console.log(page);
    
    changePage(page);
    this.fillTasks();
  }

  changeOrder(field) {
    const { orderField, changeOrder, changeSortDirection } = this.props;

    if (orderField === field) changeSortDirection();
    else changeOrder(field);
    this.fillTasks();
  }

  render() {
    const { tasks } = this.props;
    const { pagesCount } = this.state;

    return (
      <>
        <div className="order">
          <div onClick={() => this.changeOrder('id')}>id</div>
          <div onClick={() => this.changeOrder('username')}>имя пользователя</div>
          <div onClick={() => this.changeOrder('email')}>email</div>
          <div>текст задачи</div>
          <div onClick={() => this.changeOrder('status')}>статус</div>
        </div>
        <div className="tasks-list">
          {
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
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
  totalTaskCount: PropTypes.number.isRequired,
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
