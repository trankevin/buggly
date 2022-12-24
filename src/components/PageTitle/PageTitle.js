import style from "./PageTitle.module.scss";

export default function PageTitle({title}) {

    return(
        <h1 className={style.title}>{title}</h1>
    );
}