import { database } from './index';

class Controller {
    public static index(req: any, res: any) {
        console.log(database.models);
        res.send('done');
    }
}

export default Controller;
