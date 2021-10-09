import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { ORGANIZATION_TITLE_FIELD } from "../organization/OrganizationTitle";

export const OrganizationInvitationList = (
  props: ListProps
): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Organization Invitations"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="Accepted At" source="acceptedAt" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="Email Sent At" source="emailSentAt" />
        <TextField label="ID" source="id" />
        <ReferenceField
          label="Organization"
          source="organization.id"
          reference="Organization"
        >
          <TextField source={ORGANIZATION_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="User Email" source="userEmail" />
      </Datagrid>
    </List>
  );
};
