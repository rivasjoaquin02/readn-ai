type TableName = "user" | "book" | "userBook" | "author" | "authorBook";
type CreateTableFn = () => Promise<void>;
type InsertDataFn<T> = (data: T) => Promise<void>;
type ErrorFn = (e: Error) => void;

class DatabaseTable<T> {
    private table: TableName;
    private data: T[];
    private createTableCallback: CreateTableFn;
    private insertDataCallback: InsertDataFn<T>;
    private onError?: ErrorFn;

    constructor(
        table: TableName,
        data: T[],
        createTableCallback: CreateTableFn,
        insertDataCallback: InsertDataFn<T>,
        onError?: ErrorFn
    ) {
        this.table = table;
        this.data = data;
        this.createTableCallback = createTableCallback;
        this.insertDataCallback = insertDataCallback;
        this.onError = onError;
    }

    createTable = async () =>
        this.createTableCallback()
            .then(() => {
                console.log(`Correctly created table ${this.table}`);
            })
            .catch((err: Error) => {
                console.error(`Error creating table ${this.table}: `, err);
                if (this.onError) this.onError(err);
            });

    insertData = async () => {
        await Promise.all(this.data.map(this.insertDataCallback))
            .then((insertedData) =>
                console.log(
                    `Seeded ${insertedData.length} of ${this.data.length} from table ${this.table}`
                )
            )
            .catch((err: Error) => {
                console.error(`Error seeding table ${this.table}: `, err);
                if (this.onError) this.onError(err);
            });
    };
}

export class DatabaseTableBuilder<T> {
    private table: TableName;
    private data: T[];
    private createTableCallback: CreateTableFn;
    private insertDataCallback: InsertDataFn<T>;
    private onError?: ErrorFn;

    constructor(table: TableName) {
        this.table = table;
    }

    withData(data: T[]): this {
        this.data = data;
        return this;
    }

    withCreateTableCallback(callback: CreateTableFn): this {
        this.createTableCallback = callback;
        return this;
    }

    withInsertDataCallback(callback: InsertDataFn<T>): this {
        this.insertDataCallback = callback;
        return this;
    }

    withOnErrorCallback(callback: ErrorFn): this {
        this.onError = callback;
        return this;
    }

    build(): DatabaseTable<T> {
        return new DatabaseTable(
            this.table,
            this.data,
            this.createTableCallback,
            this.insertDataCallback,
            this.onError
        );
    }
}

