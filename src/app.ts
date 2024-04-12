import 'dotenv/config';
import { Express } from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { AppDataSource } from './integrations/database';
import Logger from './core/logger/logger';
import appOptions from './app.options';

class App {
	public express: Express;

	constructor() {
		this.initializeServer();

		this.initializeDatabase();

		this.initializeLogger();
	}

	private initializeServer() {
		this.express = createExpressServer(appOptions);
	}

	private initializeLogger() {
		new Logger().initializeWinston();
	}

	private initializeDatabase() {
		AppDataSource.initialize()
			.then(() => {})
			.catch(err => console.error('db connection error', err));
	}
}

export default App;
