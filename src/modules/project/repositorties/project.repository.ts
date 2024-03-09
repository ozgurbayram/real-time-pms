import { Repository } from "typeorm";
import Project from "../entities/project.entity";
import { AppDataSource } from '../../../integrations/database';

class ProjectRepository extends Repository<Project> {
  constructor() {
    super(Project, AppDataSource.manager);
  }
}

export default ProjectRepository