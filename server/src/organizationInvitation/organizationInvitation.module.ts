import { Module } from "@nestjs/common";
import { OrganizationInvitationModuleBase } from "./base/organizationInvitation.module.base";
import { OrganizationInvitationService } from "./organizationInvitation.service";
import { OrganizationInvitationController } from "./organizationInvitation.controller";
import { OrganizationInvitationResolver } from "./organizationInvitation.resolver";

@Module({
  imports: [OrganizationInvitationModuleBase],
  controllers: [OrganizationInvitationController],
  providers: [OrganizationInvitationService, OrganizationInvitationResolver],
  exports: [OrganizationInvitationService],
})
export class OrganizationInvitationModule {}
