import { PrismaService } from "nestjs-prisma";
import { Prisma, OrganizationInvitation, Organization } from "@prisma/client";

export class OrganizationInvitationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.OrganizationInvitationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationInvitationFindManyArgs>
  ): Promise<number> {
    return this.prisma.organizationInvitation.count(args);
  }

  async findMany<T extends Prisma.OrganizationInvitationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationInvitationFindManyArgs>
  ): Promise<OrganizationInvitation[]> {
    return this.prisma.organizationInvitation.findMany(args);
  }
  async findOne<T extends Prisma.OrganizationInvitationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationInvitationFindUniqueArgs>
  ): Promise<OrganizationInvitation | null> {
    return this.prisma.organizationInvitation.findUnique(args);
  }
  async create<T extends Prisma.OrganizationInvitationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationInvitationCreateArgs>
  ): Promise<OrganizationInvitation> {
    return this.prisma.organizationInvitation.create<T>(args);
  }
  async update<T extends Prisma.OrganizationInvitationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationInvitationUpdateArgs>
  ): Promise<OrganizationInvitation> {
    return this.prisma.organizationInvitation.update<T>(args);
  }
  async delete<T extends Prisma.OrganizationInvitationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrganizationInvitationDeleteArgs>
  ): Promise<OrganizationInvitation> {
    return this.prisma.organizationInvitation.delete(args);
  }

  async getOrganization(parentId: string): Promise<Organization | null> {
    return this.prisma.organizationInvitation
      .findUnique({
        where: { id: parentId },
      })
      .organization();
  }
}
