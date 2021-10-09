import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AppService } from "./app.service";
import { AppControllerBase } from "./base/app.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("apps")
@common.Controller("apps")
export class AppController extends AppControllerBase {
  constructor(
    protected readonly service: AppService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
