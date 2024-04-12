import { Repository } from 'typeorm';
import { AppDataSource } from '../../../integrations/database';
import ProjectUser from '../entities/project-user.entity';
import Project from '../entities/project.entity';
import { User } from '../../user/entities/user.entity';

class ProjectUserRepository extends Repository<ProjectUser> {
	constructor() {
		super(ProjectUser, AppDataSource.manager);
	}

	public async findProjectUser(project: Project, user: User) {
		const projectUser = await this.findOne({
			where: {
				project,
				user,
			},
		});

		if (!projectUser) {
			throw new Error('No project user found');
		}

		return projectUser;
	}
}

export default ProjectUserRepository;
