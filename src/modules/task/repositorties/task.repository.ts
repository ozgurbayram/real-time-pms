import { Repository } from "typeorm";
import Task from "../entities/task.entity";
import { AppDataSource } from "../../../integrations/database";

class TaskRepository extends Repository<Task> {
  constructor() {
    super(Task, AppDataSource.manager);
  }
}

export default TaskRepository
