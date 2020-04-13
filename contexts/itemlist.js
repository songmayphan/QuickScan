import React, { useState, createContext } from 'react'

export const ListContext = createContext()

const ListContextProvider = (props) => {
    const [list, setList] = useState([]);

  return (
    <ListContext.Provider value={{list, setList}}>
        {props.children}
    </ListContext.Provider>
  )
}

export default ListContextProvider;