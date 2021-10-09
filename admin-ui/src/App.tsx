import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { OrganizationList } from "./organization/OrganizationList";
import { OrganizationCreate } from "./organization/OrganizationCreate";
import { OrganizationEdit } from "./organization/OrganizationEdit";
import { OrganizationShow } from "./organization/OrganizationShow";
import { OrganizationMembershipList } from "./organizationMembership/OrganizationMembershipList";
import { OrganizationMembershipCreate } from "./organizationMembership/OrganizationMembershipCreate";
import { OrganizationMembershipEdit } from "./organizationMembership/OrganizationMembershipEdit";
import { OrganizationMembershipShow } from "./organizationMembership/OrganizationMembershipShow";
import { OrganizationInvitationList } from "./organizationInvitation/OrganizationInvitationList";
import { OrganizationInvitationCreate } from "./organizationInvitation/OrganizationInvitationCreate";
import { OrganizationInvitationEdit } from "./organizationInvitation/OrganizationInvitationEdit";
import { OrganizationInvitationShow } from "./organizationInvitation/OrganizationInvitationShow";
import { AppList } from "./app/AppList";
import { AppCreate } from "./app/AppCreate";
import { AppEdit } from "./app/AppEdit";
import { AppShow } from "./app/AppShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"Amplication SaaS Demo"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Organization"
          list={OrganizationList}
          edit={OrganizationEdit}
          create={OrganizationCreate}
          show={OrganizationShow}
        />
        <Resource
          name="OrganizationMembership"
          list={OrganizationMembershipList}
          edit={OrganizationMembershipEdit}
          create={OrganizationMembershipCreate}
          show={OrganizationMembershipShow}
        />
        <Resource
          name="OrganizationInvitation"
          list={OrganizationInvitationList}
          edit={OrganizationInvitationEdit}
          create={OrganizationInvitationCreate}
          show={OrganizationInvitationShow}
        />
        <Resource
          name="App"
          list={AppList}
          edit={AppEdit}
          create={AppCreate}
          show={AppShow}
        />
      </Admin>
    </div>
  );
};

export default App;
