import AddModal from "components/AddModal/AddModal";
import PageTitle from "components/PageTitle/PageTitle";
import ProjectGrid from "components/ProjectGrid/ProjectGrid";

export default function ProjectsPage() {
    return (
        <>
            <PageTitle title="Projects" />
            <AddModal type="project" title="Add New Project" />
            <ProjectGrid />
        </>
        
    );
}