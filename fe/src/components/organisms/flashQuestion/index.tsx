import React from 'react'
import styles from "./index.module.scss"

type FlashQuestionProperties = {
  questionItem: {
    questionText: string,
    choices: {id: string, label: string}[]
    answer: string
  }
  handleOptionChange: (id: string, answer: string)=>void
} 

export const FlashQuestion: React.FC<FlashQuestionProperties> = ({ questionItem,handleOptionChange }) => {
  return (
    <div className={styles.quiz}>
    <div className={styles.innerblock}>
      <div className={styles.quizcontent}></div>
      <div className={styles.quizquestionnumber}>
        <img src="images/flash_mondai.png" alt=''/>
      </div>
      <h2 className={styles.quizquestion}>
        {questionItem.questionText}
      </h2>
      <ul className={styles.quizanswer}>
        {questionItem.choices.map((choice)=>
          <li className={styles.list}>
            <label className={styles.quizbutton}>
              <input
                className={styles.radio}
                name="radio"
                type="radio"
                value={choice.id}
                onChange={()=>handleOptionChange(choice.id,questionItem.answer)}
              />
              <span>{choice.label}</span>
            </label>
          </li>)
        }
      </ul>
    </div>
  </div>
  )
}
