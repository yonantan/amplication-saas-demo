import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";

import { OrganizationTitle } from "../organization/OrganizationTitle";

export const OrganizationInvitationEdit = (
  props: EditProps
): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <DateTimeInput label="Accepted At" source="acceptedAt" />
        <DateTimeInput label="Email Sent At" source="emailSentAt" />
        <ReferenceInput
          source="organization.id"
          reference="Organization"
          label="Organization"
        >
          <SelectInput optionText={OrganizationTitle} />
        </ReferenceInput>
        <TextInput label="User Email" source="userEmail" type="email" />
      </SimpleForm>
    </Edit>
  );
};
