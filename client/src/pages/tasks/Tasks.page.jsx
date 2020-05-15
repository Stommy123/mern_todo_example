import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useModal } from 'hooks';
import { Table, SectionWrapper, FormContent } from 'components';
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
  const [TaskErrorModal, openTaskErrorModal] = useModal({});
  const [NewTaskModal, openNewTaskModal, closeNewTaskModal] = useModal();

  const fetchTasks = async _ => {
    try {
      const { data } = await axios.get('/tasks/mine');
      setTasks(data.tasks || []);
      setNeedToRefetch(false);
    } catch (err) {
      console.error('Failed to fetch task', err);
      openTaskErrorModal();
    }
  };

  const handleCompleteTask = async ({ _id, isCompleted }) => {
    try {
      const updatedStatus = !isCompleted;

      const { data } = await axios.patch(`/tasks/${_id}`, { isCompleted: updatedStatus });

      if (!data.updated) return openTaskErrorModal();

      setNeedToRefetch(true);
    } catch (err) {
      console.error('Failed to complete task', err);
      openTaskErrorModal();
    }
  };

  const handleDeleteTask = async ({ _id }) => {
    try {
      const { data } = await axios.delete(`/tasks/${_id}`);

      if (!data.deleted) return openTaskErrorModal();

      setNeedToRefetch(true);
    } catch (err) {
      console.error('Failed to delete task', err);
      openTaskErrorModal();
    }
  };

  const handleFormChange = field => e => setNewTaskData({ ...newTaskData, [field]: e.target.value });

  const handleCreateNewTask = async e => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/tasks', newTaskData);
      if (!data.task) throw new Error('Task Creation Error');

      setNeedToRefetch(true);
    } catch (err) {
      openTaskErrorModal();
      console.error('Error creating task', err);
    } finally {
      setNewTaskData(INITIAL_NEW_TASK);
      closeNewTaskModal();
    }
  };

  useEffect(
    _ => {
      if (needToRefetch) fetchTasks();
    },
    [needToRefetch]
  );

  return (
    <SectionWrapper className='tasksSection'>
      <div className={classes.tasksWrapper}>
        <Table
          rowData={tasks}
          columnDefs={COLUMN_DEFS}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
          onAddNew={openNewTaskModal}
          title='My Tasks'
        />
        <TaskErrorModal icon='error' className='errorModal'>
          <div className={classes.modalText}>
            <h3>Error Performing Task Operation</h3>
          </div>
        </TaskErrorModal>
        <NewTaskModal hideClose header='New Task Information'>
          <form className={classes.newTaskForm} onSubmit={handleCreateNewTask}>
            <FormContent.TaskFormContent onChange={handleFormChange} {...newTaskData} />
            <button type='submit'>Create Task</button>
          </form>
        </NewTaskModal>
      </div>
    </SectionWrapper>
  );
};

export default Tasks;
