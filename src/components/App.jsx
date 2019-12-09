import React, { PureComponent, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/AppActions';
import Modal from './Modal';
import AddTaskModal from './AddTaskModal';
import '../styles/App.scss';

import { addTask } from '../utils/help';

const TaskList = React.lazy(() => import('./TaskList'));

const modalRoot = document.getElementById('modal-root');

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="loader-title">Загрузка...</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // return {
  //   tasks: state.tasks,
  //   totalTaskCount: state.totalTaskCount,
  //   orderFiled: state.orderFiled,
  //   sortDirection: state.sortDirection,
  //   pageSize: state.pageSize,
  //   curPage: state.curPage,
  // };
  return {...state};
};

export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      showError: false,
      showSuccess: false,
      showAddTask: false,
    };

    this.onAddTask = this.onAddTask.bind(this);
    this.showMsg = this.showMsg.bind(this);
    this.openAddTaskWindow = this.openAddTaskWindow.bind(this);
    this.closeAddTaskWindow = this.closeAddTaskWindow.bind(this);
  }

  onAddTask(name, email, text) {
    this.setState({
      isLoading: true,
    });
    addTask({
      username: name,
      email,
      text,
    }).then((data) => {
      if (data.status === 'ok') {
        this.showMsg('showSuccess');
      } else {
        this.showMsg('showError');
      }
      this.setState({
        isLoading: false,
      });
    }).catch((error) => {
      this.showMsg('showError');
      this.setState({
        isLoading: false,
      });
    });
  }

  openAddTaskWindow() {
    this.changeStateAddTask(true);
  }

  closeAddTaskWindow() {
    this.changeStateAddTask(false);
  }

  changeStateAddTask(flag) {
    this.setState({
      showAddTask: flag,
    });
  }

  showMsg(type) {
    this.setState({
      [type]: true,
    });

    setTimeout(() => {
      this.setState({
        [type]: false,
      });
    }, 2000);
  }

  render() {
    const { tasks } = this.props;

    const {
      isLoading,
      showError,
      showSuccess,
      showAddTask,
    } = this.state;

    let resultText = '';
    let resultClass = '';
    if (showError) {
      resultText = <span>Ошибка.<br />Повторите попытку.</span>;
      resultClass = 'error';
    } else if (showSuccess) {
      resultText = <span>Успех!<br />Задача добавлена</span>;
      resultClass = 'success';
    }

    return (
      <div className="root-wrapper">
        {isLoading
          && ReactDOM.createPortal(
            <Loader />,
            modalRoot,
          )}
        {(showError || showSuccess)
          && ReactDOM.createPortal(
            <Modal>
              <div className={`result-window ${resultClass}`}>
                {resultText}
              </div>
            </Modal>,
            modalRoot,
          )}
        {showAddTask
          && ReactDOM.createPortal(
            <AddTaskModal addTask={this.onAddTask} close={this.closeAddTaskWindow} />,
            modalRoot,
          )}
        <div className="task-wrapper">
          <Suspense fallback={<Loader />}>
            <TaskList {...this.props} />
          </Suspense>
        </div>
        <div className="button-wrapper">
          <button
            className="add-task-btn"
            type="button"
            onClick={this.openAddTaskWindow}
          >
            Добавить задачу
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions,
)(App);

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
