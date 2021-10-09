import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OrganizationMembershipService } from "./organizationMembership.service";
import { OrganizationMembershipControllerBase } from "./base/organizationMembership.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("organization-memberships")
@common.Controller("organization-memberships")
export class OrganizationMembershipController extends OrganizationMembershipControllerBase {
  constructor(
    protected readonly service: OrganizationMembershipService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
