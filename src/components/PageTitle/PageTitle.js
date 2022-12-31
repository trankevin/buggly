import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./PageTitle.module.scss";

export default function PageTitle({title}) {

    const { projectID } = useParams();
    const myProjects = useSelector(state => state.myProjects);

    if (projectID && myProjects.length) {
        const project = myProjects.filter(project => project.id == projectID)[0];
        title = project.projectName;
    } 
  
    return(
        <h1 className={style.title}>{title}</h1>
    );
}