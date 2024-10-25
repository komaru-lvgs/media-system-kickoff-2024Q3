import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'

export const Name: React.FC = () => {
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

  // 名前リスト
  const [nameList, setNameList] = useState<string[]>([])

  // 現在の名前
  const [currentName, setCurrentName] = useState<string>()

  useEffect(() => {
    // TODO: データベースから名前一覧を取得
    // ベタ打ち？
    setNameList([
      '苗字＋名前',
      '細田 一成',
      '三浦 一希',
      '山下 翔',
      '瀬上 真宏',
      '後藤 智輝',
      '縄巻 一鴻',
      '桐生 直輝',
      '岡島 喜希',
      '塚本 貴之',
      '齋藤 匠',
      '松嶋 一平',
      '美馬 翔希',
      '黒田 光咲',
      '西屋 遥希',
      '小林 峻也',
      '矢野 貴大',
      '柳 朱洵',
      '川口 耀平',
      '高木 智幸',
      '大形 一真',
      '工藤 雄大',
      '岡本 侑樹',
      '内山 竜我',
      '山城 直輝',
      '関口 一騎',
      '堀井 良守哉',
      '林 幸多郎',
      '髙橋 右京',
      '矢野 敬太',
      '田代 敬太',
      '小丸 友梨',
      '德永 眞哉',
      '佐藤 拓',
      '野中 柊',
      '小島 洋明',
      '吉﨑 愛理',
      '古川 修慈',
      '佐々木 美奈',
      '馬場 純一',
      '山本 龍雄',
      '梅村 悠雅',
      '坂本 眞太郎',
      '稲村 麟',
      '牧野 航大',
      '木村 颯',
      '金 栄世',
      '松本 悠太郎',
      '光永 皓香',
      '西 慎一郎',
      '香川 淳',
      '岡本 愛',
      '阿部 倉怜',
      '𠮷田 球花',
      '大滝 圭修',
      '向井田 崚平',
      '岩本 健太郎',
      '下畑 剣一郎',
      '石田 貴義',
      '堀本 知弥',
      '大井 翼',
      '山本 寛太',
      '上遠野 聡',
      '宇田 知生',
      '三口 廉',
      '中野上 龍太郎',
      '福本 浩希',
      '井上 萌々香',
      '田中 瑚大',
      '内田 朋悠',
      '竹下 義晃',
    ])
  }, [])

  // 名前の変更を反映
  const handleListBoxSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentName(event.target.value)
  }

  // 名前確定後にリダイレクト
  const handleNameSubmitButton = () => {
    // TODO: 名前登録する処理を書く

    // 問題画面にリダイレクト
    window.location.href = `/card?oa=${isOA}&group=${groupID}&question=${questionID}`
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img
              src="/images/information.png"
              className={styles.iconImage}
              alt="icon"
            />
          </div>
          <div className={styles.message}>名前を選択してください</div>
          <div className={styles.nameListContainer}>
            <label className={styles.nameListBox}>
              <select onChange={(event) => handleListBoxSelected(event)}>
                {nameList.map((name) => {
                  return <option>{name}</option>
                })}
              </select>
            </label>
            <div className={styles.submitButtonFix}>
              {currentName !== undefined && currentName !== nameList[0] ? (
                <img
                  src="./images/OKButton.png"
                  className={styles.submitButton}
                  onClick={() => handleNameSubmitButton()}
                  alt="submit"
                />
              ) : (
                <img
                  src="./images/OKButton.png"
                  className={`${styles.submitButton} ${styles.disabled}`}
                  alt="disabled"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
