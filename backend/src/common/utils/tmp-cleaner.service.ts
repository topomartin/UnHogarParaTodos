import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TmpCleanerService implements OnApplicationBootstrap {

    onApplicationBootstrap() {
        this.cleanTmpFolder();
    }

    private cleanTmpFolder() {
        const tmpPath = path.join(process.cwd(), 'uploads', 'tmp');

        if (!fs.existsSync(tmpPath)) {
            return;
        }

        try {
            const files = fs.readdirSync(tmpPath);

            for (const file of files) {
                const filePath = path.join(tmpPath, file);

                try {
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.error('Error deleting tmp file:', filePath, err);
                }
            }

            console.log(`TMP cleaned: ${files.length} files removed`);

        } catch (err) {
            console.error('Error reading tmp folder:', err);
        }
    }
}