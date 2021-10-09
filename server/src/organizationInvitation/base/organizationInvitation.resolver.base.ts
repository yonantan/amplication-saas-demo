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
import { CreateOrganizationInvitationArgs } from "./CreateOrganizationInvitationArgs";
import { UpdateOrganizationInvitationArgs } from "./UpdateOrganizationInvitationArgs";
import { DeleteOrganizationInvitationArgs } from "./DeleteOrganizationInvitationArgs";
import { OrganizationInvitationFindManyArgs } from "./OrganizationInvitationFindManyArgs";
import { OrganizationInvitationFindUniqueArgs } from "./OrganizationInvitationFindUniqueArgs";
import { OrganizationInvitation } from "./OrganizationInvitation";
import { Organization } from "../../organization/base/Organization";
import { OrganizationInvitationService } from "../organizationInvitation.service";

@graphql.Resolver(() => OrganizationInvitation)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class OrganizationInvitationResolverBase {
  constructor(
    protected readonly service: OrganizationInvitationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "read",
    possession: "any",
  })
  async _organizationInvitationsMeta(
    @graphql.Args() args: OrganizationInvitationFindManyArgs
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

  @graphql.Query(() => [OrganizationInvitation])
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "read",
    possession: "any",
  })
  async organizationInvitations(
    @graphql.Args() args: OrganizationInvitationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<OrganizationInvitation[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "OrganizationInvitation",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => OrganizationInvitation, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "read",
    possession: "own",
  })
  async organizationInvitation(
    @graphql.Args() args: OrganizationInvitationFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<OrganizationInvitation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "OrganizationInvitation",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => OrganizationInvitation)
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "create",
    possession: "any",
  })
  async createOrganizationInvitation(
    @graphql.Args() args: CreateOrganizationInvitationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<OrganizationInvitation> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "OrganizationInvitation",
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
        `providing the properties: ${properties} on ${"OrganizationInvitation"} creation is forbidden for roles: ${roles}`
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
      },
    });
  }

  @graphql.Mutation(() => OrganizationInvitation)
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "update",
    possession: "any",
  })
  async updateOrganizationInvitation(
    @graphql.Args() args: UpdateOrganizationInvitationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<OrganizationInvitation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "OrganizationInvitation",
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
        `providing the properties: ${properties} on ${"OrganizationInvitation"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => OrganizationInvitation)
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "delete",
    possession: "any",
  })
  async deleteOrganizationInvitation(
    @graphql.Args() args: DeleteOrganizationInvitationArgs
  ): Promise<OrganizationInvitation | null> {
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
    resource: "OrganizationInvitation",
    action: "read",
    possession: "any",
  })
  async organization(
    @graphql.Parent() parent: OrganizationInvitation,
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
