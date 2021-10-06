import "./IndexPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectsPageContainer from "./ProjectsPageContainer";
import ProjectsPageContainer_done from "./ProjectsPageContainer_done";
import ProjectAddPageContainer from "./ProjectAddPageContainer";
import KanbanPageContainer from "./KanbanPageContainer";
import ProjectInfoPageContainer from "./ProjectInfoPageContainer";
import SprintAddPageContainer from "./SprintAddPageContainer";
import SprintInfoPageContainer from "./SprintInfoPageContainer";
import LoginPageContainer from "./LoginPageContainer";
import MorePageContainer from "./MorePageContainer";
import SignupPageContainer from "./SignupPageContainer";
import PwChangePageContainer from "./PwChangePageContainer";
//import { Route } from "react-router-dom";
//import { Route } from "react-chrome-extension-router";
import { MemoryRouter, Route, Switch } from "react-router-dom";
function IndexPage() {
  return (
    <div className="IndexPage">
      <MemoryRouter>
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/" component={LoginPageContainer} exact />
          <Route path="/login" component={LoginPageContainer} exact />
          <Route path="/login/sign_up" component={SignupPageContainer} exact />
          <Route path="/login/update" component={PwChangePageContainer} exact />
          <Route
            path="/project/doing"
            component={ProjectsPageContainer}
            exact
          />
          <Route
            path="/project/done"
            component={ProjectsPageContainer_done}
            exact
          />
          <Route
            path="/project/postpage"
            component={ProjectAddPageContainer}
            exact
          />
          <Route
            path="/project/:projectId/kanban"
            component={KanbanPageContainer}
            exact
          />
          <Route
            path="/project/:projectId/sprint"
            component={ProjectInfoPageContainer}
            exact
          />
          <Route
            path="/:projectId/sprint/postpage/page"
            component={SprintAddPageContainer}
            exact
          />
          <Route
            path="/sprint/:sprintId"
            component={SprintInfoPageContainer}
            exact
          />
        </Switch>
        <Route path="/more" component={MorePageContainer} exact />
        <Route path="/" component={Footer} exact />
        <Route path="/project" component={Footer} />
        <Route path="/sprint" component={Footer} />
        <Route path="/more" component={Footer} />
      </MemoryRouter>
    </div>
  );
}

export default IndexPage;
