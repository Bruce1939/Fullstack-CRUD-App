import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';

const Task = ({ 
    task, 
    handleCheck, 
    handleDelete, 
    handleUpdate 
}) => {

    const [updatedTask, setUpdatedTask] = useState(task.task);
    const [openUpdate, setOpenUpdate] = useState(false);

  return (
      <div className="task">
        <div className="task-shown display">
            <div className="task-body">
                <input 
                    type="checkbox" 
                    id="task" 
                    checked={task.checked} 
                    onChange={(e) => handleCheck(task._id)}
                />
                <span 
                className={task.checked ? 'line-through' : ''}
                onClick={() => handleCheck(task._id)}>
                    {task.task}
                </span>
            </div>

            <div className="task-ops display">
                <BsPencilSquare onClick={() => setOpenUpdate(!openUpdate)}/>

                <AiOutlineDelete onClick={() => handleDelete(task._id)}/>
            </div>
        </div>

        <div className={openUpdate ? "task-hidden display" : "hidden"}>
            { openUpdate && (
                <form onSubmit={(e) => handleUpdate(e, { updatedTask, id: task._id })}
                className="display"
                >
                    <input 
                        type="text"
                        value={updatedTask}
                        onChange={(e) => setUpdatedTask(e.target.value)}
                    />
                    <button type="submit" id="task-submit">update</button>
                </form>
            )}
        </div>
      </div>
  )
}

export default Task;