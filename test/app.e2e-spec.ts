import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as pactum from "pactum";
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto";

describe("App e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(1331);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl("http://localhost:1331");
  });

  afterAll(() => {
    app.close();
  });

  describe("Auth", () => {
    const dto: AuthDto = {
      email: "test@test.test",
      password: "123",
    };

    describe("Signup", () => {
      it("should signup", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody(dto)
          .expectStatus(HttpStatus.CREATED);
      });

      it("should throw if password is empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({ email: dto.email })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it("should throw if email is empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({ password: dto.password })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it("should throw if no body provided", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
    });

    describe("Signin", () => {
      it("should signin", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody(dto)
          .expectStatus(200)
          .stores("userAccessToken", "access_token");
      });

      it("should throw if password is empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({ email: dto.email })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it("should throw if email is empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({ password: dto.password })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it("should throw if no body provided", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe("User", () => {
    describe("Get me", () => {
      it("should get current user", () => {
        return pactum
          .spec()
          .get("/users/me")
          .withHeaders({
            Authorization: "Bearer $S{userAccessToken}",
          })
          .expectStatus(HttpStatus.OK);
      });
    });

    describe("Edit user", () => {
      it.todo("should edit user");
    });
  });

  describe("Bookmark", () => {
    describe("Create Bookmark", () => {
      it.todo("should create Bookmark");
    });

    describe("Edit Bookmark", () => {
      it.todo("should edit bookmark");
    });

    describe("Get all bookmarks", () => {
      it.todo("should return all bookmarks");
    });

    describe("Get bookmark by id", () => {
      it.todo("should return bookmark");
    });

    describe("Delete bookmark", () => {
      it.todo("should delete bookmark");
    });
  });
});
