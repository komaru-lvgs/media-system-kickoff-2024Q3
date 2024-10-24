import { FormEvent, useState } from 'react'

import styles from './index.module.scss'
import { useMutateAuth } from '../../../hooks/useMutateAuth'
import { departments } from '../../../libs/department'

type MemberName = {
  inputId: string
  familyName: string
  firstName: string
}

export const Start: React.FC = () => {
  const { registerTeamMutation, registerMemberMutation } = useMutateAuth()
  const [department, setDepartment] = useState<string>('')
  const [memberNames, setMemberNames] = useState<MemberName[]>([])

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    await registerTeamMutation
      .mutateAsync({
        department,
        point: 0,
      })
      .then(() => {
        registerMemberMutation.mutateAsync(memberNames)
      })
  }

  const validateForm = () => {
    let isValid = true

    if (!department) {
      isValid = false
      alert('事業部を選択してください。')
    }

    if (
      memberNames.length < 2 ||
      memberNames.some((name) => !name.familyName || !name.firstName)
    ) {
      isValid = false
      alert('2名以上のメンバーの姓名を登録してください。')
    }

    return isValid
  }

  return (
    <div className={styles.parent}>
      <img
        src="images/start_screen_background.png"
        className={styles.background}
        alt="background"
      />
      <div className={styles.main}>
        <form onSubmit={submitAuthHandler} className={styles.form}>
          <select
            className={styles.department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="" disabled selected hidden>
              事業部を選択してください
            </option>
            {Object.entries(departments).map(([key, value]) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              )
            })}
          </select>
          <ul className={styles.nameInput}>
            {[1, 2, 3].map((index) => (
              <li key={index} className={styles.namePoint}>
                <input
                  id={`氏-${index}`}
                  className={styles.formInput}
                  placeholder="氏"
                  type="text"
                  onChange={(e) =>
                    setMemberNames((memberNames) => {
                      const targetMember = memberNames.find(
                        (memberName) =>
                          memberName.inputId === e.target.id.slice(2, 3),
                      )
                      targetMember
                        ? (targetMember.familyName = e.target.value)
                        : memberNames.push({
                            inputId: e.target.id.slice(2, 3),
                            familyName: e.target.value,
                            firstName: '',
                          })
                      memberNames = memberNames.filter(
                        (name) => name.familyName || name.firstName,
                      )
                      return memberNames
                    })
                  }
                />
                <input
                  id={`名-${index}`}
                  className={styles.formInput}
                  placeholder="名"
                  type="text"
                  onChange={(e) =>
                    setMemberNames((memberNames) => {
                      const targetMember = memberNames.find(
                        (memberName) =>
                          memberName.inputId === e.target.id.slice(2, 3),
                      )
                      targetMember
                        ? (targetMember.firstName = e.target.value)
                        : memberNames.push({
                            inputId: e.target.id.slice(2, 3),
                            familyName: '',
                            firstName: e.target.value,
                          })
                      memberNames = memberNames.filter(
                        (name) => name.familyName || name.firstName,
                      )
                      return memberNames
                    })
                  }
                />
              </li>
            ))}
          </ul>
          <button className={styles.startButton} disabled={false}>
            START
          </button>
        </form>
      </div>
    </div>
  )
}
