import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'users'})
export class User extends Model<User>{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING})
    name: string;

    @Column({ type: DataType.BOOLEAN})
    reserve: boolean;
}