import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { OrganizationTitle } from "../organization/OrganizationTitle";
import { UserTitle } from "../user/UserTitle";

export const OrganizationMembershipCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="organization.id"
          reference="Organization"
          label="Organization"
        >
          <SelectInput optionText={OrganizationTitle} />
        </ReferenceInput>
        <ReferenceInput source="user.id" reference="User" label="User">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
