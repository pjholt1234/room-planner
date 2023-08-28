import { database } from '../index';
import ControllerInterface from './ControllerInterface';

class PlanController implements ControllerInterface {
    public static async index(req: any, res: any) {
        const Plan = database.models.Plan;

        const doc = await Plan.find({});
        const plans = doc.map((plan: any) => {
            return {
                id: plan._id,
                planName: plan.planName
            };
        });
        res.send(plans);
    }

    public static async get(req: any, res: any) {
        const Plan = database.models.Plan;
        const { id } = req.params;

        const doc = await Plan.find({ _id: id });
        res.send(doc);
    }

    public static async create(req: any, res: any) {
        const postData = req.body;
        const Plan = database.models.Plan;

        const newPlan = new Plan(postData);
        newPlan.save();
        res.send(newPlan);
    }

    public static async update(req: any, res: any) {
        const Plan = database.models.Plan;
        const { id } = req.params;
        const postData = req.body;

        const doc = await Plan.findByIdAndUpdate(id, postData, {
            new: true
        });

        res.send(doc);
    }

    public static async delete(req: any, res: any) {
        const Plan = database.models.Plan;
        const { id } = req.params;

        await Plan.deleteOne({ _id: id });

        res.send('Success');
    }
}

export default PlanController;
