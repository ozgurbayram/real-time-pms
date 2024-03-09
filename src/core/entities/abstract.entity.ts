import {  Index, PrimaryGeneratedColumn } from "typeorm";
class AbstractEntity {
	@PrimaryGeneratedColumn()
	id: number;
}

export default AbstractEntity;
