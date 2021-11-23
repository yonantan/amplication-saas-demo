import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { OrganizationInvitationService } from "../organizationInvitation.service";
import { OrganizationInvitationCreateInput } from "./OrganizationInvitationCreateInput";
import { OrganizationInvitationWhereInput } from "./OrganizationInvitationWhereInput";
import { OrganizationInvitationWhereUniqueInput } from "./OrganizationInvitationWhereUniqueInput";
import { OrganizationInvitationFindManyArgs } from "./OrganizationInvitationFindManyArgs";
import { OrganizationInvitationUpdateInput } from "./OrganizationInvitationUpdateInput";
import { OrganizationInvitation } from "./OrganizationInvitation";
@swagger.ApiBasicAuth()
export class OrganizationInvitationControllerBase {
  constructor(
    protected readonly service: OrganizationInvitationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: OrganizationInvitation })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: OrganizationInvitationCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OrganizationInvitation> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "OrganizationInvitation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"OrganizationInvitation"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        organization: {
          connect: data.organization,
        },
      },
      select: {
        acceptedAt: true,
        createdAt: true,
        emailSentAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
        userEmail: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [OrganizationInvitation] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => OrganizationInvitationFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OrganizationInvitation[]> {
    const args = plainToClass(
      OrganizationInvitationFindManyArgs,
      request.query
    );

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "OrganizationInvitation",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        acceptedAt: true,
        createdAt: true,
        emailSentAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
        userEmail: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: OrganizationInvitation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: OrganizationInvitationWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OrganizationInvitation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "OrganizationInvitation",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        acceptedAt: true,
        createdAt: true,
        emailSentAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
        userEmail: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: OrganizationInvitation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: OrganizationInvitationWhereUniqueInput,
    @common.Body()
    data: OrganizationInvitationUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OrganizationInvitation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "OrganizationInvitation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"OrganizationInvitation"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          organization: {
            connect: data.organization,
          },
        },
        select: {
          acceptedAt: true,
          createdAt: true,
          emailSentAt: true,
          id: true,

          organization: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
          userEmail: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "OrganizationInvitation",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: OrganizationInvitation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: OrganizationInvitationWhereUniqueInput
  ): Promise<OrganizationInvitation | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          acceptedAt: true,
          createdAt: true,
          emailSentAt: true,
          id: true,

          organization: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
          userEmail: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
