import moment from 'moment'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BsCalendarCheck, BsHourglassSplit } from 'react-icons/bs'
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { MdSaveAlt } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import { useAppContext } from '../context/appContext'
import JobInfo from './JobInfo'

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  status,
  createdAt,
}) => {
  const { setEditJob, toggleModal, toggleArchiveModal, setDeleteJobId } =
    useAppContext()
  const date = moment(createdAt).format('LLL')

  const openModal = id => {
    setDeleteJobId(id)
    toggleModal()
  }

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
            {status === 'interview' && (
              <span>
                <BsCalendarCheck />
                interview
              </span>
            )}
            {status === 'pending' && (
              <span>
                <BsHourglassSplit />
                pending
              </span>
            )}
            {status === 'declined' && (
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
              onClick={() => openModal(_id)}>
              <AiOutlineDelete /> delete
            </button>
            {/* ADD TO ARCHIVE 🚧 */}
            {status === 'declined' && (
              <button
                type="button"
                className="btn archive-btn"
                onClick={toggleArchiveModal}>
                <MdSaveAlt /> archive
              </button>
            )}
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Job
