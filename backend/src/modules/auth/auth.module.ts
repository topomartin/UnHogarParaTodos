import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { UserModule } from "../user/user.module";
import { AuthenticationController } from "./auth.controller";
import { AuthenticationService } from "./services/auth.service";

@Module({
  imports: [UserModule],
  providers: [AuthenticationService, ],
  controllers: [AuthenticationController],
})
export class AthenticationModule {}