import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    private saltOrRounds = 10;

    async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, this.saltOrRounds);
    }

    private async generateSalt(){
        return await bcrypt.genSalt();
    }

    async getMatch(password, hash): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }

}


