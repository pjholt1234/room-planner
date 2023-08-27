import path from 'path';
import dotenv from 'dotenv';

function importEnv() {
    const envPath = path.resolve(__dirname, './../../', '.env');
    dotenv.config({ path: envPath });
}

export default importEnv;
