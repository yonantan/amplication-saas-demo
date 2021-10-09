import { Module } from "@nestjs/common";
import { OrganizationMembershipModuleBase } from "./base/organizationMembership.module.base";
import { OrganizationMembershipService } from "./organizationMembership.service";
import { OrganizationMembershipController } from "./organizationMembership.controller";
import { OrganizationMembershipResolver } from "./organizationMembership.resolver";

@Module({
  imports: [OrganizationMembershipModuleBase],
  controllers: [OrganizationMembershipController],
  providers: [OrganizationMembershipService, OrganizationMembershipResolver],
  exports: [OrganizationMembershipService],
})
export class OrganizationMembershipModule {}
