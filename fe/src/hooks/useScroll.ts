import { useEffect, useState } from 'react'

export const useScroll = (input: {isLoading: boolean,scrollStep: number,scrollDelay : number }) => {
  const [isBottom,setIsBottom]= useState<boolean>(false)
  useEffect(() => {
    if(input.isLoading) return
  
    function scrollToBottom() {
        if (window.scrollY < document.body.scrollHeight) {
            window.scrollTo(0, window.scrollY + input.scrollStep)
            if(window.scrollY >= document.body.scrollHeight- window.innerHeight){
              const timeout=setTimeout(()=>{
                setIsBottom(true)          
              },2000)
      
            }
        } 
    }
    const interval = setInterval(scrollToBottom, input.scrollDelay)
    return () => clearInterval(interval)
  }, [input.isLoading, input.scrollDelay, input.scrollStep])
  return {isBottom}
}