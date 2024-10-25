// import styles from "./index.module.scss"
import { useCallback } from "react"
import { useMutateTeamPoint } from "../../../hooks/useMutationTeamPoint"
import { useQueryTeam } from "../../../hooks/useQueryTeam"
import { Timer } from "../../atoms/timer"

//TODO: 仮で作成したため、後で修正する
export const MiniGame: React.FC =() => {
  const { data, isLoading } = useQueryTeam()
  const {updateTeamPointMutation} = useMutateTeamPoint()
  const handleClick = useCallback(
    () => {
      if(data?.point=== undefined || data?.point === null) return
      updateTeamPointMutation.mutate(data?.point+10)
    },
    [data?.point, updateTeamPointMutation],
  )
  return (
    <div>
      <Timer second={45}/>
      <p>
        チーム名表示
      </p>
      <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <p >
          {JSON.stringify(data)}
        </p>
        <button onClick={handleClick}>
          ここを押すとログイン中のチームのポイントが10ポイント上昇します。
        </button>
          </>
      )}
      </div>
  
    </div>
  )
}
