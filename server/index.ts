const faker = require('@faker-js/faker').faker;
const jsonServer = require('json-server');
const fs = require('fs');
const cors = require('cors');

const dbPath = 'server/db.json';

const generateReport = () => {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.words(3),
        data: [],
    };
};

const generateReports = () => {
    const numReports = faker.number.int({ min: 1, max: 5 });
    const reports: any[] = [];

    for (let i = 0; i < numReports; i++) {
        const report = generateReport();

        reports.push(report);
    }

    return reports;
};

const generateNewClient = () => {
    return {
        id: faker.string.uuid(),
        name: faker.company.name(),
        reports: generateReports(),
    };
};

const generateClients = (count: number) => {
    const clients: any[] = [];
    for (let i = 0; i < count; i++) {
        const client = generateNewClient();
        clients.push(client);
    }
    return clients;
};

const data = {
    clients: generateClients(5),
};

fs.writeFileSync(dbPath, JSON.stringify(data));

const server = jsonServer.create();
const router = jsonServer.router(dbPath);

server.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
server.options('*', cors());
const middlewares = jsonServer.defaults({ noCors: true });

server.get('/clients', (req, res) => {
    const clients = router.db.get('clients').value();
    res.json(clients);
});

server.post('/clients', (req, res) => {
    const newClient = generateNewClient();
    router.db.get('clients').push(newClient).write();
    res.json(newClient);
});

server.use(middlewares);
server.use(router);

server.listen(3004, () => {
    console.log('JSON Server is running on port 3004');
});
