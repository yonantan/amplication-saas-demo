import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { OrganizationInvitationResolverBase } from "./base/organizationInvitation.resolver.base";
import { OrganizationInvitation } from "./base/OrganizationInvitation";
import { OrganizationInvitationService } from "./organizationInvitation.service";

@graphql.Resolver(() => OrganizationInvitation)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class OrganizationInvitationResolver extends OrganizationInvitationResolverBase {
  constructor(
    protected readonly service: OrganizationInvitationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
