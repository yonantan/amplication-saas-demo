import { Organization } from "../organization/Organization";

export type OrganizationInvitation = {
  acceptedAt: Date | null;
  createdAt: Date;
  emailSentAt: Date | null;
  id: string;
  organization?: Organization;
  updatedAt: Date;
  userEmail: string;
};
