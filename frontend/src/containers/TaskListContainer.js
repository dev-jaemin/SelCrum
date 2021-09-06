import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TaskList from '../components/TaskList';

function TaskListContainer(props) {
  return (
    <TaskList />
  );
}

export default TaskListContainer;
