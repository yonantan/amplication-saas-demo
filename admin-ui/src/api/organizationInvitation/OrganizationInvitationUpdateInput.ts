import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type OrganizationInvitationUpdateInput = {
  acceptedAt?: Date | null;
  emailSentAt?: Date | null;
  organization?: OrganizationWhereUniqueInput;
  userEmail?: string;
};
