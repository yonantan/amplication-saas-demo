import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  OrganizationMembership,
  Organization,
  User,
} from "@prisma/client";

export class OrganizationMembershipServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.OrganizationMembershipFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationMembershipFindManyArgs>
  ): Promise<number> {
    return this.prisma.organizationMembership.count(args);
  }

  async findMany<T extends Prisma.OrganizationMembershipFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationMembershipFindManyArgs>
  ): Promise<OrganizationMembership[]> {
    return this.prisma.organizationMembership.findMany(args);
  }
  async findOne<T extends Prisma.OrganizationMembershipFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationMembershipFindUniqueArgs>
  ): Promise<OrganizationMembership | null> {
    return this.prisma.organizationMembership.findUnique(args);
  }
  async create<T extends Prisma.OrganizationMembershipCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationMembershipCreateArgs>
  ): Promise<OrganizationMembership> {
    return this.prisma.organizationMembership.create<T>(args);
  }
  async update<T extends Prisma.OrganizationMembershipUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationMembershipUpdateArgs>
  ): Promise<OrganizationMembership> {
    return this.prisma.organizationMembership.update<T>(args);
  }
  async delete<T extends Prisma.OrganizationMembershipDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationMembershipDeleteArgs>
  ): Promise<OrganizationMembership> {
    return this.prisma.organizationMembership.delete(args);
  }

  async getOrganization(parentId: string): Promise<Organization | null> {
    return this.prisma.organizationMembership
      .findUnique({
        where: { id: parentId },
      })
      .organization();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.organizationMembership
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
