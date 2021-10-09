import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type OrganizationInvitationWhereInput = {
  acceptedAt?: DateTimeNullableFilter;
  emailSentAt?: DateTimeNullableFilter;
  id?: StringFilter;
  organization?: OrganizationWhereUniqueInput;
  userEmail?: StringFilter;
};
