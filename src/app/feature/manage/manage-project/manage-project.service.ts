// src/app/features/project/manage-project/manage-project.service.ts
import { Injectable } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';

@Injectable()
export class ManageProjectService {
  constructor(private projectService: ProjectService) {}

  async loadProjects(companyId: string) {
    return await this.projectService.getProjects(companyId);
  }

  async getProject(companyId: string, projectId: string) {
    return await this.projectService.getProject(companyId, projectId);
  }

  async addProject(companyId: string, data: any) {
    return await this.projectService.addProject(companyId, data);
  }

  async updateProject(companyId: string, projectId: string, data: any) {
    return await this.projectService.updateProject(companyId, projectId, data);
  }

  async deleteProject(companyId: string, projectId: string) {
    return await this.projectService.deleteProject(companyId, projectId);
  }
}
