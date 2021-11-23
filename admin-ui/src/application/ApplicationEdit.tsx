import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { UserTitle } from "../user/UserTitle";
import { OrganizationTitle } from "../organization/OrganizationTitle";

export const ApplicationEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput source="user.id" reference="User" label="Created By">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
        <TextInput label="Name" source="name" />
        <ReferenceInput
          source="organization.id"
          reference="Organization"
          label="Organization"
        >
          <SelectInput optionText={OrganizationTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
