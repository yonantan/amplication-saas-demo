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
import { OrganizationMembershipService } from "../organizationMembership.service";
import { OrganizationMembershipCreateInput } from "./OrganizationMembershipCreateInput";
import { OrganizationMembershipWhereInput } from "./OrganizationMembershipWhereInput";
import { OrganizationMembershipWhereUniqueInput } from "./OrganizationMembershipWhereUniqueInput";
import { OrganizationMembershipFindManyArgs } from "./OrganizationMembershipFindManyArgs";
import { OrganizationMembershipUpdateInput } from "./OrganizationMembershipUpdateInput";
import { OrganizationMembership } from "./OrganizationMembership";
@swagger.ApiBasicAuth()
export class OrganizationMembershipControllerBase {
  constructor(
    protected readonly service: OrganizationMembershipService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "OrganizationMembership",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: OrganizationMembership })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: OrganizationMembershipCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OrganizationMembership> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "OrganizationMembership",
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
        `providing the properties: ${properties} on ${"OrganizationMembership"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        organization: {
          connect: data.organization,
        },

        user: {
          connect: data.user,
        },
      },
      select: {
        createdAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
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
    resource: "OrganizationMembership",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [OrganizationMembership] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => OrganizationMembershipFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OrganizationMembership[]> {
    const args = plainToClass(
      OrganizationMembershipFindManyArgs,
      request.query
    );

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "OrganizationMembership",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
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
    resource: "OrganizationMembership",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: OrganizationMembership })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: OrganizationMembershipWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OrganizationMembership | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "OrganizationMembership",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
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
    resource: "OrganizationMembership",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: OrganizationMembership })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: OrganizationMembershipWhereUniqueInput,
    @common.Body()
    data: OrganizationMembershipUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OrganizationMembership | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "OrganizationMembership",
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
        `providing the properties: ${properties} on ${"OrganizationMembership"} update is forbidden for roles: ${roles}`
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

          user: {
            connect: data.user,
          },
        },
        select: {
          createdAt: true,
          id: true,

          organization: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
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
    resource: "OrganizationMembership",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: OrganizationMembership })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: OrganizationMembershipWhereUniqueInput
  ): Promise<OrganizationMembership | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          id: true,

          organization: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
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
