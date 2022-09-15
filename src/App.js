import './App.css';
import {TaskManager} from './components/TaskManager';
import TaskState from './context/tasks/TaskState';

function App() {
  return (
    <TaskState>
      <div>
        <TaskManager/>
      </div>
    </TaskState>
  );
}

export default App;
