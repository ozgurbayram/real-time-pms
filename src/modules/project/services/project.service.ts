import ProjectRepository from "../repositorties/project.repository";

class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  public static createProject() {
  }
}

export default ProjectService;
