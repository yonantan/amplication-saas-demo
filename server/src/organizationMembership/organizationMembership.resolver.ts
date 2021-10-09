import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { OrganizationMembershipResolverBase } from "./base/organizationMembership.resolver.base";
import { OrganizationMembership } from "./base/OrganizationMembership";
import { OrganizationMembershipService } from "./organizationMembership.service";

@graphql.Resolver(() => OrganizationMembership)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class OrganizationMembershipResolver extends OrganizationMembershipResolverBase {
  constructor(
    protected readonly service: OrganizationMembershipService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
