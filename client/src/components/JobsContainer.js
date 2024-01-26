import { useEffect } from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import {  getAllTasks } from "../features/Job/AllTaskSlice";

const JobsContainer = () => {
  const {
    tasks,
    isLoading,
    totalTask,
    search,
    searchStatus,
    sort,
  } = useSelector((store) => store.allJobs);
  
  const dispatch = useDispatch();

  // console.log(tasks)
  
  useEffect(() => {
    dispatch(getAllTasks());
  }, [search, searchStatus ,sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalTask} task{tasks.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {tasks.map((task) => {
          return <Job key={task._id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
