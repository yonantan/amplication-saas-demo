import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { OrganizationInvitationServiceBase } from "./base/organizationInvitation.service.base";

@Injectable()
export class OrganizationInvitationService extends OrganizationInvitationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
