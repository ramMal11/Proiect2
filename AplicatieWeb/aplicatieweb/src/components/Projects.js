import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'

import { getProjects } from '../actions/actions'

// const projectsSelector = state => state.list.projects

// const Projects = (props) => {
//     const projects = useSelector(projectsSelector, shallowEqual)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getProjects())
//     }, [dispatch])

//     return (
//         <div>
//             <h1>Ramona</h1>
//             <div>
//                 { 
//                     projects.map(e => <div key={e.i}>{e.content}</div>)
//                 }
//             </div>
//         </div>
//     )
// }

import React from 'react';

export default function Projects() {
  return(
    <h2>Preferences</h2>
  );
}
// export default Projects;