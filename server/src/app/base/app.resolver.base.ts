import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateAppArgs } from "./CreateAppArgs";
import { UpdateAppArgs } from "./UpdateAppArgs";
import { DeleteAppArgs } from "./DeleteAppArgs";
import { AppFindManyArgs } from "./AppFindManyArgs";
import { AppFindUniqueArgs } from "./AppFindUniqueArgs";
import { App } from "./App";
import { Organization } from "../../organization/base/Organization";
import { AppService } from "../app.service";

@graphql.Resolver(() => App)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class AppResolverBase {
  constructor(
    protected readonly service: AppService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "App",
    action: "read",
    possession: "any",
  })
  async _appsMeta(
    @graphql.Args() args: AppFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [App])
  @nestAccessControl.UseRoles({
    resource: "App",
    action: "read",
    possession: "any",
  })
  async apps(
    @graphql.Args() args: AppFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<App[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "App",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => App, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "App",
    action: "read",
    possession: "own",
  })
  async app(
    @graphql.Args() args: AppFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<App | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "App",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => App)
  @nestAccessControl.UseRoles({
    resource: "App",
    action: "create",
    possession: "any",
  })
  async createApp(
    @graphql.Args() args: CreateAppArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<App> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "App",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"App"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        organization: args.data.organization
          ? {
              connect: args.data.organization,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => App)
  @nestAccessControl.UseRoles({
    resource: "App",
    action: "update",
    possession: "any",
  })
  async updateApp(
    @graphql.Args() args: UpdateAppArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<App | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "App",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"App"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          organization: args.data.organization
            ? {
                connect: args.data.organization,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => App)
  @nestAccessControl.UseRoles({
    resource: "App",
    action: "delete",
    possession: "any",
  })
  async deleteApp(@graphql.Args() args: DeleteAppArgs): Promise<App | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Organization, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "App",
    action: "read",
    possession: "any",
  })
  async organization(
    @graphql.Parent() parent: App,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Organization | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Organization",
    });
    const result = await this.service.getOrganization(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
