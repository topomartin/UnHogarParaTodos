import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserProfileService } from "./services/user-profile.service";
import { CreateUserProfileDto } from "./dto/create-user-profile.dto";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";

@Controller("user-profile")
export class UserProfileController {
    constructor(private service: UserProfileService) { }

    @Get(":userId")
    getByUser(@Param("userId") userId: number) {
        return this.service.getByUserId(userId);
    }

    @Post(":userId")
    createForUser(@Param("userId") userId: number) {
        return this.service.createForUser(userId);
    }

    @Post()
    create(@Body() dto: CreateUserProfileDto) {
        return this.service.create(dto);
    }

    @Post(":userId/upsert")
    upsert(
        @Param("userId") userId: number,
        @Body() dto: CreateUserProfileDto
    ) {
        return this.service.upsertByUserId(userId, dto);
    }

    @Patch(":id")
    update(
        @Param("id") id: number,
        @Body() dto: UpdateUserProfileDto,
    ) {
        return this.service.update(id, dto);
    }
}