const faker = require('@faker-js/faker').faker;
const jsonServer = require('json-server');
const fs = require('fs');
const cors = require('cors');

const dbPath = 'server/db.json';

const generateSalesExpensesData = () => {
    const labels: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
    ];
    const datasets = [
        {
            label: `Sales`,
            data: Array.from({ length: labels.length }, () =>
                faker.number.int({ min: 0, max: 1000 })
            ),
        },
        {
            label: `Expenses`,
            data: Array.from({ length: labels.length }, () =>
                faker.number.int({ min: 0, max: 1000 })
            ),
        },
    ];

    return {
        id: faker.string.uuid(),
        type: 'expenses',
        title: 'Sales and Expenses',
        labels,
        datasets,
    };
};

const generateAdsData = () => {
    const labels: string[] = [
        'Direct',
        'Referral',
        'Organic Search',
        'Social Media',
        'Paid Advertising',
    ];
    const datasets = [
        {
            label: 'Customer Acquisition',
            data: [25, 15, 30, 10, 20],
        },
    ];

    return {
        id: faker.string.uuid(),
        type: 'ads',
        title: 'Customers Traffic',
        labels,
        datasets,
    };
};

const generateReport = () => {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.words(3),
        data: [generateSalesExpensesData(), generateAdsData()],
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

const filterByQueries = <T>(
    array: T[],
    queries: Record<string, string>
): T[] => {
    return array.filter((item) => {
        let isValid = true;

        for (let key in queries) {
            isValid =
                isValid &&
                item[key].toLowerCase().includes(queries[key].toLowerCase());
        }

        return isValid;
    });
};

const data = {
    clients: generateClients(5),
};

fs.writeFileSync(dbPath, JSON.stringify(data));

const server = jsonServer.create();
const router = jsonServer.router(dbPath);

const getClients = () => router.db.get('clients');
const getClientById = (id: string) =>
    getClients().find((client) => client.id === id);

const getClientIndex = (reportId: string) => {
    return getClients()
        .value()
        .findIndex((client) =>
            client.reports.some((report) => report.id === reportId)
        );
};

const getReportByReportId = (id: string) => {
    return getClients()
        .value()
        [getClientIndex(id)].reports.find((report) => report.id === id);
};

const findClientAndReportIndex = (reportId: string) => {
    const clientIndex = getClientIndex(reportId);

    if (clientIndex !== -1) {
        const reportIndex = router.db
            .get(`clients[${clientIndex}].reports`)
            .value()
            .findIndex((report) => report.id === reportId);

        if (reportIndex !== -1) {
            return {
                clientIndex,
                reportIndex,
            };
        }
    }

    return null;
};

function addDataToReport(clientIndex, reportIndex, data) {
    router.db
        .get(`clients[${clientIndex}].reports[${reportIndex}].data`)
        .push(data)
        .write();
}

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
    const queries = req.query;
    const clients = getClients().value();

    const filteredClients = filterByQueries(clients, queries);

    res.json(filteredClients);
});

server.post('/clients', (req, res) => {
    const newClient = generateNewClient();
    getClients().push(newClient).write();
    res.json(newClient);
});

server.post('/clients/:id/add_report', (req, res) => {
    const clientId = req.params.id;
    const client = getClients().find({ id: clientId }).value();
    const report = generateReport();

    if (client) {
        client.reports.push(report);
        router.db.write();
        res.status(201).json(report);
    } else {
        res.status(404).json({ error: 'Client not found' });
    }
});

server.post('/reports/:id/add_data', (req, res) => {
    const reportId = req.params.id;
    const data = [generateSalesExpensesData, generateAdsData][
        Math.round(Math.random())
    ]();

    const indexes = findClientAndReportIndex(reportId);

    if (indexes) {
        addDataToReport(indexes.clientIndex, indexes.reportIndex, data);
        res.status(201).json(data);
    } else {
        res.status(404).json({ error: 'Report not found' });
    }
});

server.delete('/clients/:clientId/reports/:reportId', (req, res) => {
    const clientId = req.params.clientId;
    const reportId = req.params.reportId;

    const client = getClientById(clientId).value();
    const reports = client.reports;

    if (client) {
        const reportIndex = reports.findIndex(
            (report) => report.id === reportId
        );

        if (reportIndex !== -1) {
            reports.splice(reportIndex, 1);

            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Report not found' });
        }
    } else {
        res.status(404).json({ error: 'Client not found' });
    }
});

server.delete('/reports/:reportId/data/:dataId', (req, res) => {
    const dataId = req.params.dataId;
    const reportId = req.params.reportId;

    const report = getReportByReportId(reportId);
    const data = report.data;

    if (report) {
        const dataIndex = data.findIndex((data) => data.id === dataId);

        if (dataIndex !== -1) {
            data.splice(dataIndex, 1);

            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Data not found' });
        }
    } else {
        res.status(404).json({ error: 'Report not found' });
    }
});

server.use(middlewares);
server.use(router);

server.listen(3004, () => {
    console.log('JSON Server is running on port 3004');
});
