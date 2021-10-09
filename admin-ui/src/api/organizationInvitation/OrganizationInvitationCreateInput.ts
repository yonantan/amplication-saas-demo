import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type OrganizationInvitationCreateInput = {
  acceptedAt?: Date | null;
  emailSentAt?: Date | null;
  organization: OrganizationWhereUniqueInput;
  userEmail: string;
};
