import { PrismaService } from "nestjs-prisma";

import {
  Prisma,
  Organization,
  Application,
  OrganizationInvitation,
  OrganizationMembership,
  User,
} from "@prisma/client";

export class OrganizationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.OrganizationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationFindManyArgs>
  ): Promise<number> {
    return this.prisma.organization.count(args);
  }

  async findMany<T extends Prisma.OrganizationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationFindManyArgs>
  ): Promise<Organization[]> {
    return this.prisma.organization.findMany(args);
  }
  async findOne<T extends Prisma.OrganizationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationFindUniqueArgs>
  ): Promise<Organization | null> {
    return this.prisma.organization.findUnique(args);
  }
  async create<T extends Prisma.OrganizationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationCreateArgs>
  ): Promise<Organization> {
    return this.prisma.organization.create<T>(args);
  }
  async update<T extends Prisma.OrganizationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationUpdateArgs>
  ): Promise<Organization> {
    return this.prisma.organization.update<T>(args);
  }
  async delete<T extends Prisma.OrganizationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationDeleteArgs>
  ): Promise<Organization> {
    return this.prisma.organization.delete(args);
  }

  async findApplications(
    parentId: string,
    args: Prisma.ApplicationFindManyArgs
  ): Promise<Application[]> {
    return this.prisma.organization
      .findUnique({
        where: { id: parentId },
      })
      .applications(args);
  }

  async findOrganizationInvitations(
    parentId: string,
    args: Prisma.OrganizationInvitationFindManyArgs
  ): Promise<OrganizationInvitation[]> {
    return this.prisma.organization
      .findUnique({
        where: { id: parentId },
      })
      .organizationInvitations(args);
  }

  async findOrganizationMemberships(
    parentId: string,
    args: Prisma.OrganizationMembershipFindManyArgs
  ): Promise<OrganizationMembership[]> {
    return this.prisma.organization
      .findUnique({
        where: { id: parentId },
      })
      .organizationMemberships(args);
  }

  async getOwner(parentId: string): Promise<User | null> {
    return this.prisma.organization
      .findUnique({
        where: { id: parentId },
      })
      .owner();
  }
}
