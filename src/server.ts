import App from './app';

const PORT = process.env.PORT || 3000;

const appInstance = new App();
const app = appInstance.express;
const host = process.env.HOST || '192.168.1.2';

app.listen(PORT as number, host, () => {
	console.log(`Server is running on http://${host}:${PORT}`);
});
