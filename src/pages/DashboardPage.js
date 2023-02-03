import PageTitle from "components/PageTitle/PageTitle";
import BugList from 'components/Buglist/BugList';
import AddModal from "components/AddModal/AddModal";
import Summary from 'components/Summary/Summary';

export default function DashboardPage() {

    return (
        <>
            <PageTitle title="Dashboard"/>
            <Summary/>
            <AddModal type="bug" title="Add New Bug" />
            <BugList /> 

        </>
    );
}