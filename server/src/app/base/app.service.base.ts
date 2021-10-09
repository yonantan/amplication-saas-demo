import { PrismaService } from "nestjs-prisma";
import { Prisma, App, Organization } from "@prisma/client";

export class AppServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.AppFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppFindManyArgs>
  ): Promise<number> {
    return this.prisma.app.count(args);
  }

  async findMany<T extends Prisma.AppFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppFindManyArgs>
  ): Promise<App[]> {
    return this.prisma.app.findMany(args);
  }
  async findOne<T extends Prisma.AppFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppFindUniqueArgs>
  ): Promise<App | null> {
    return this.prisma.app.findUnique(args);
  }
  async create<T extends Prisma.AppCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppCreateArgs>
  ): Promise<App> {
    return this.prisma.app.create<T>(args);
  }
  async update<T extends Prisma.AppUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppUpdateArgs>
  ): Promise<App> {
    return this.prisma.app.update<T>(args);
  }
  async delete<T extends Prisma.AppDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppDeleteArgs>
  ): Promise<App> {
    return this.prisma.app.delete(args);
  }

  async getOrganization(parentId: string): Promise<Organization | null> {
    return this.prisma.app
      .findUnique({
        where: { id: parentId },
      })
      .organization();
  }
}
