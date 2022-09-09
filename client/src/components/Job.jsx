import moment from "moment";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCalendarCheck, BsHourglassSplit } from "react-icons/bs";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useAppContext } from "../context/appContext";
import JobInfo from "./JobInfo";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  status,
  createdAt,
}) => {
  const { setEditJob, toggleModal, setDeleteJobId } = useAppContext();
  const date = moment(createdAt).format("LLL");

  const openDeleteModal = (id) => {
    setDeleteJobId(id);
    toggleModal();
  };

  return (
    <Wrapper className={`${status}-bcg`}>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>
            {status === "interview" && (
              <span>
                <BsCalendarCheck />
                interview
              </span>
            )}
            {status === "pending" && (
              <span>
                <BsHourglassSplit />
                pending
              </span>
            )}
            {status === "declined" && (
              <span>
                <GiCancel />
                declined
              </span>
            )}
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => setEditJob(_id)}>
              <AiOutlineEdit /> edit
            </Link>

            <button
              type="button"
              className="btn delete-btn"
              onClick={() => openDeleteModal(_id)}>
              <AiOutlineDelete /> delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;