import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OrganizationInvitationService } from "./organizationInvitation.service";
import { OrganizationInvitationControllerBase } from "./base/organizationInvitation.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("organization-invitations")
@common.Controller("organization-invitations")
export class OrganizationInvitationController extends OrganizationInvitationControllerBase {
  constructor(
    protected readonly service: OrganizationInvitationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
