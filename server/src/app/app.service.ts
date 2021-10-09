import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { AppServiceBase } from "./base/app.service.base";

@Injectable()
export class AppService extends AppServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
