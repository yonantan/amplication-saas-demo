import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateOrganizationMembershipArgs } from "./CreateOrganizationMembershipArgs";
import { UpdateOrganizationMembershipArgs } from "./UpdateOrganizationMembershipArgs";
import { DeleteOrganizationMembershipArgs } from "./DeleteOrganizationMembershipArgs";
import { OrganizationMembershipFindManyArgs } from "./OrganizationMembershipFindManyArgs";
import { OrganizationMembershipFindUniqueArgs } from "./OrganizationMembershipFindUniqueArgs";
import { OrganizationMembership } from "./OrganizationMembership";
import { Organization } from "../../organization/base/Organization";
import { User } from "../../user/base/User";
import { OrganizationMembershipService } from "../organizationMembership.service";

@graphql.Resolver(() => OrganizationMembership)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class OrganizationMembershipResolverBase {
  constructor(
    protected readonly service: OrganizationMembershipService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "OrganizationMembership",
    action: "read",
    possession: "any",
  })
  async _organizationMembershipsMeta(
    @graphql.Args() args: OrganizationMembershipFindManyArgs
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

  @graphql.Query(() => [OrganizationMembership])
  @nestAccessControl.UseRoles({
    resource: "OrganizationMembership",
    action: "read",
    possession: "any",
  })
  async organizationMemberships(
    @graphql.Args() args: OrganizationMembershipFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<OrganizationMembership[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "OrganizationMembership",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => OrganizationMembership, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "OrganizationMembership",
    action: "read",
    possession: "own",
  })
  async organizationMembership(
    @graphql.Args() args: OrganizationMembershipFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<OrganizationMembership | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "OrganizationMembership",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => OrganizationMembership)
  @nestAccessControl.UseRoles({
    resource: "OrganizationMembership",
    action: "create",
    possession: "any",
  })
  async createOrganizationMembership(
    @graphql.Args() args: CreateOrganizationMembershipArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<OrganizationMembership> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "OrganizationMembership",
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
        `providing the properties: ${properties} on ${"OrganizationMembership"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        organization: {
          connect: args.data.organization,
        },

        user: {
          connect: args.data.user,
        },
      },
    });
  }

  @graphql.Mutation(() => OrganizationMembership)
  @nestAccessControl.UseRoles({
    resource: "OrganizationMembership",
    action: "update",
    possession: "any",
  })
  async updateOrganizationMembership(
    @graphql.Args() args: UpdateOrganizationMembershipArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<OrganizationMembership | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "OrganizationMembership",
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
        `providing the properties: ${properties} on ${"OrganizationMembership"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          organization: {
            connect: args.data.organization,
          },

          user: {
            connect: args.data.user,
          },
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

  @graphql.Mutation(() => OrganizationMembership)
  @nestAccessControl.UseRoles({
    resource: "OrganizationMembership",
    action: "delete",
    possession: "any",
  })
  async deleteOrganizationMembership(
    @graphql.Args() args: DeleteOrganizationMembershipArgs
  ): Promise<OrganizationMembership | null> {
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
    resource: "OrganizationMembership",
    action: "read",
    possession: "any",
  })
  async organization(
    @graphql.Parent() parent: OrganizationMembership,
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

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "OrganizationMembership",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: OrganizationMembership,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
