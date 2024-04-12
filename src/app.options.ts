import { Action, RoutingControllersOptions } from 'routing-controllers';
import { ErrorHandler } from './core/middlewares/error-handler.middleware';
import bodyParser from 'body-parser';
import path from 'path';

const controllersPath = path.join(
	__dirname,
	'modules',
	'**',
	'network',
	'*.controller{.ts,.js}',
);

const appOptions: RoutingControllersOptions = {
	controllers: [controllersPath],
	routePrefix: '/api',
	middlewares: [bodyParser.json(), ErrorHandler],
	defaultErrorHandler: false,
	cors: true,
	currentUserChecker: async (action: Action) => {
		return action.request.user;
	},
};

export default appOptions;
