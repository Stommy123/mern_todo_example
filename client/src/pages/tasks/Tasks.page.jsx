import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useModal } from 'hooks';
import { Table, SectionWrapper, FormContent } from 'components';
import { mapErrorCodeToMessage } from 'utils';
import { COLUMN_DEFS } from './Tasks.schema';
import classes from './Tasks.module.scss';

const INITIAL_NEW_TASK = {
  name: '',
  description: '',
  dueDate: '',
};

const Tasks = _ => {
  const [tasks, setTasks] = useState([]);
  const [newTaskData, setNewTaskData] = useState(INITIAL_NEW_TASK);
  const [needToRefetch, setNeedToRefetch] = useState(true);
  const [TaskErrorModal, openTaskErrorModal] = useModal();
  const [NewTaskModal, openNewTaskModal, closeNewTaskModal] = useModal();

  const fetchTasks = async _ => {
    try {
      const { data } = await axios.get('/tasks/mine');

      setTasks(data.tasks || []);
      setNeedToRefetch(false);
    } catch (err) {
      console.error('Failed to fetch task', err);
      openTaskErrorModal(mapErrorCodeToMessage(err));
    }
  };

  const handleCompleteTask = async ({ _id, isCompleted }) => {
    try {
      const { data } = await axios.patch(`/tasks/${_id}`, { isCompleted: !isCompleted });

      if (data.error || !data.success) throw new Error(mapErrorCodeToMessage(data.error));

      setNeedToRefetch(true);
    } catch (err) {
      console.error('Failed to complete task', err);
      openTaskErrorModal(err.message);
    }
  };

  const handleDeleteTask = async ({ _id }) => {
    try {
      const { data } = await axios.delete(`/tasks/${_id}`);

      if (data.error || !data.success) throw new Error(mapErrorCodeToMessage(data.error));

      setNeedToRefetch(true);
    } catch (err) {
      console.error('Failed to delete task', err);
      openTaskErrorModal(err.message);
    }
  };

  const handleFormChange = field => e => setNewTaskData({ ...newTaskData, [field]: e.target.value });

  const onAddNew = _ => openNewTaskModal();

  const handleCreateNewTask = async e => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/tasks', newTaskData);

      if (data.error || !data.success) throw new Error(mapErrorCodeToMessage(data.error));

      setNeedToRefetch(true);
    } catch (err) {
      console.error('Error creating task', err);
      openTaskErrorModal(err.message);
    } finally {
      setNewTaskData(INITIAL_NEW_TASK);
      closeNewTaskModal();
    }
  };

  useEffect(_ => void (needToRefetch && fetchTasks()), [needToRefetch]);

  return (
    <SectionWrapper className='tasksSection'>
      <div className={classes.tasksWrapper}>
        <Table
          rowData={tasks}
          columnDefs={COLUMN_DEFS}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
          onAddNew={onAddNew}
          title='My Tasks'
        />
        <TaskErrorModal icon='error' className='errorModal' />
        <NewTaskModal hideClose header='New Task Information'>
          <form className={classes.newTaskForm} onSubmit={handleCreateNewTask}>
            <FormContent.TaskFormContent onChange={handleFormChange} {...newTaskData} />
            <div className={classes.taskFormActions}>
              <button type='submit'>Create Task</button>
              <button onClick={closeNewTaskModal} type='button'>
                Cancel
              </button>
            </div>
          </form>
        </NewTaskModal>
      </div>
    </SectionWrapper>
  );
};

export default Tasks;
