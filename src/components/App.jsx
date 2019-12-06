import React, { PureComponent, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/AppActions';
import Modal from './Modal';
import '../styles/App.scss';

import sendCompleteData from '../utils/help';

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
  return {
    tasks: state.tasks,
    totalTaskCount: state.totalTaskCount,
    pageSize: state.pageSize,
    curPage: state.curPage,
  };
};

export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      showSuccess: false,
    };

    this.onAddTask = this.onAddTask.bind(this);
    this.showMsg = this.showMsg.bind(this);
  }

  onAddTask() {
    const { addTasks } = this.props;
    addTasks();
  }

  showMsg() {
    this.setState({
      showSuccess: true,
    });

    setTimeout(() => {
      this.setState({
        showSuccess: false,
      });
    }, 2000);
  }

  render() {
    const { tasks } = this.props;

    const {
      showError,
      showSuccess,
    } = this.state;

    let resultText = '';
    let resultClass = '';
    if (showError) {
      resultText = <span>Ошибка сервера.<br />Повторите попытку.</span>;
      resultClass = 'error';
    } else if (showSuccess) {
      resultText = <span>Успех!<br />Задача добавлена</span>;
      resultClass = 'success';
    }

    return (
      <div className="root-wrapper">
        {(showError || showSuccess)
          && ReactDOM.createPortal(
            <Modal>
              <div className={`result-window ${resultClass}`}>
                {resultText}
              </div>
            </Modal>,
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
            onClick={this.onAddTask}
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
  addTasks: PropTypes.func.isRequired,
};
