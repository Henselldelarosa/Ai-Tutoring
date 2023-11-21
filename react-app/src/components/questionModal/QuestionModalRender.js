import React, {useState, useContext} from 'react'
import {Modal} from '../../context/Modal'
import QuestionModal from './QuestionModal'

const QuestionModalRender = ({subject,question,showModal,setShowModal,answer}) => {

  const handleModal =(e) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <div>

      <button
      hidden
        type='submit'
        onClick={handleModal}
        className='postEditModalButton'
      >
        {/* <EditIcon
        className="shareEditIcon"

          style={
            {color: "#FAD02C"}
          }/> */}
        Edit
      </button>

      {
      showModal && (
        <Modal
        onClose={
          () => setShowModal(false)
        }
        >
          <QuestionModal
          question={question}
          answer={answer}
          subject={subject}/>
        </Modal>
      )
    } </div>
  )
}

export default QuestionModalRender
