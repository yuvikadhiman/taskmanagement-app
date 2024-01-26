import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  createTask,
  editTask
} from "../../features/Job/jobSlice";
import { useEffect } from "react";

const AddJob = () => {
  const {
    isLoading,
    task,
    description,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.task);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !description) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editTask({
          taskId: editJobId,
          task: { task, description, status },
        })
      );
      return;
    }
    dispatch(createTask({ task, description, status }));
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    // if (!isEditing) {
    //   dispatch(handleChange({ name: "jobLocation", value: user.location }));
    // }
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit task" : "add task"}</h3>

        <div className="form-center">
          {/* task*/}
         
          <FormRow
            type="text"
            name="task"
            value={task}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="description"
            value={description}
            handleChange={handleJobInput}
          />
          {/* task status  */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
