import Route from '../types/Route';
import PlanController from './PlanController';

const routes: Route[] = [
    {
        method: 'get',
        path: '/',
        controller: PlanController,
        controllerFunction: 'index'
    },
    {
        method: 'get',
        path: '/:id',
        controller: PlanController,
        controllerFunction: 'get'
    },
    {
        method: 'post',
        path: '/create',
        controller: PlanController,
        controllerFunction: 'create'
    },
    {
        method: 'post',
        path: '/update/:id',
        controller: PlanController,
        controllerFunction: 'update'
    },
    {
        method: 'delete',
        path: '/delete/:id',
        controller: PlanController,
        controllerFunction: 'delete'
    }
];

export default routes;
