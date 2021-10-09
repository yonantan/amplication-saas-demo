import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { OrganizationMembershipServiceBase } from "./base/organizationMembership.service.base";

@Injectable()
export class OrganizationMembershipService extends OrganizationMembershipServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
