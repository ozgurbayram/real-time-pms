import {  Index, PrimaryGeneratedColumn } from "typeorm";

class AbstractEntity {
	@PrimaryGeneratedColumn({})
	@Index()
	id: number;
}

export default AbstractEntity;
