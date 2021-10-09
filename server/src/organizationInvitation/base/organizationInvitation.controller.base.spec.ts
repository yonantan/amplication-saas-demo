import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { OrganizationInvitationController } from "../organizationInvitation.controller";
import { OrganizationInvitationService } from "../organizationInvitation.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  acceptedAt: new Date(),
  createdAt: new Date(),
  emailSentAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  userEmail: "exampleUserEmail",
};
const CREATE_RESULT = {
  acceptedAt: new Date(),
  createdAt: new Date(),
  emailSentAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  userEmail: "exampleUserEmail",
};
const FIND_MANY_RESULT = [
  {
    acceptedAt: new Date(),
    createdAt: new Date(),
    emailSentAt: new Date(),
    id: "exampleId",
    updatedAt: new Date(),
    userEmail: "exampleUserEmail",
  },
];
const FIND_ONE_RESULT = {
  acceptedAt: new Date(),
  createdAt: new Date(),
  emailSentAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  userEmail: "exampleUserEmail",
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("OrganizationInvitation", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: OrganizationInvitationService,
          useValue: service,
        },
      ],
      controllers: [OrganizationInvitationController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /organization-invitations", async () => {
    await request(app.getHttpServer())
      .post("/organization-invitations")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        acceptedAt: CREATE_RESULT.acceptedAt.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        emailSentAt: CREATE_RESULT.emailSentAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /organization-invitations", async () => {
    await request(app.getHttpServer())
      .get("/organization-invitations")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          acceptedAt: FIND_MANY_RESULT[0].acceptedAt.toISOString(),
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          emailSentAt: FIND_MANY_RESULT[0].emailSentAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /organization-invitations/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/organization-invitations"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /organization-invitations/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/organization-invitations"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        acceptedAt: FIND_ONE_RESULT.acceptedAt.toISOString(),
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        emailSentAt: FIND_ONE_RESULT.emailSentAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
