import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getToken, editTask } from '../utils/help';

const getStatus = (status, isLogin, fun) => {
  return <input type="checkbox" disabled={!isLogin} onChange={fun} checked={status === 10} />;
};

export class TaskItem extends PureComponent {
  constructor(props) {
    super(props);

    const { text, status } = this.props.task;

    this.state = {
      needSave: false,
      text,
      status,
    };

    this.onStatusChange = this.onStatusChange.bind(this);
    this.onTaskChange = this.onTaskChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  onStatusChange(event) {
    const { text, status } = this.props.task;
    const { text: stateText } = this.state;
    const newStatus = event.currentTarget.checked ? 10 : 0;

    this.setState({
      needSave: (status !== newStatus) || (text !== stateText),
      status: newStatus,
    });
  }

  onTaskChange(event) {
    const { text, status } = this.props.task;
    const { status: stateStatus } = this.state;
    const newText = event.currentTarget.value;

    this.setState({
      needSave: status !== stateStatus || text !== newText,
      text: newText,
    });
  }

  saveChanges() {
    const token = getToken();
    const {
      task,
      logout,
      setLoading,
      updateTask,
    } = this.props;
    const { text, status } = this.state;
    let editedText = text;

    if (task.text !== text) {
      editedText += ' (отредактировано администратором)';
      this.setState({
        text: editedText,
      });
    }
    if (token) {
      setLoading(true);
      editTask(editedText, status, task.id, token).then((data) => {
        if (data.status === 'ok') updateTask(task.id, editedText, status);
        else if (data.message.token) logout();
        else {
          console.error(data);
          this.returnToDefault();
        }

        this.setState({
          needSave: false,
        });
        setLoading(false);
      });
    } else {
      logout();
      this.returnToDefault();
    }
  }

  returnToDefault() {
    const { text, status } = this.props.task;
    this.setState({
      needSave: false,
      text,
      status,
    });
  }

  render() {
    const { task, isLogin } = this.props;
    const { needSave, text, status } = this.state;

    return (
      <div className="task">
        <div className="task-list__task-item">
          <input readOnly value={task.id} />
          <input readOnly value={task.username} />
          <input readOnly value={task.email} />
          <input readOnly={!isLogin} onChange={this.onTaskChange} value={text} />
          <div>{getStatus(status, isLogin, this.onStatusChange)}</div>
        </div>
        {needSave && (
          <button
            type="button"
            className="task-list__save-btn"
            onClick={this.saveChanges}
          >
            сохранить
          </button>
        )}
      </div>
    );
  }
}

export default TaskItem;

TaskItem.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  isLogin: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};
