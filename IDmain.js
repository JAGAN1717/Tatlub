

export const setmainId = (props) => {
    localStorage.setItem('ids',props)
}

export const mainId = () => {
    if(!localStorage.getItem('ids')){
        return ''
    }
  return  localStorage.getItem('ids')
}