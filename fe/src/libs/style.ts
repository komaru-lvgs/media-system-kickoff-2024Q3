export const getClassNames = (
  styles: { readonly [key: string]: string },
  selectors: string[],
) =>
  (
    selectors.reduce((previous, current) => `${previous} ${styles[current] ?? ""}`, "") 
  ).trim()

  //getClassNames使用例))
  // className={getClassNames(styles, [
  //   "outerCircle",
  //   noShadow ? "noShadow" : "",
  // ])}
  //スタイル側では以下のように記述
  //.button {
  //   &.noShadow {
  //     box-shadow: none;
  //   }
  // }  
