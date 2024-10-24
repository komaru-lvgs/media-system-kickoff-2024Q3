import { useLocation } from "react-router-dom"

export const queryCheck = () => {
  // クエリパラメータを確認
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const isOA = Number(query.get('oa'))
  const groupID = query.get('group')
  const questionID = query.get('question')
  if (
    isOA < 0 ||
    1 < isOA ||
    Number.isNaN(isOA) ||
    groupID === null ||
    questionID === null
  ) {
    window.location.href = '/error?status=500'
  }
  return {isOA: isOA, groupID: groupID, questionID: questionID}
}
