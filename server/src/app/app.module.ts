import { Module } from "@nestjs/common";
import { AppModuleBase } from "./base/app.module.base";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";

@Module({
  imports: [AppModuleBase],
  controllers: [AppController],
  providers: [AppService, AppResolver],
  exports: [AppService],
})
export class AppModule {}
