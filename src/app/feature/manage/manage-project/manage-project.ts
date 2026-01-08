import { SHARED_PRIMENG } from '@/shared/shared-primeng';
import { Component } from '@angular/core';
import { ManageProjectService } from './manage-project.service';
import { Project } from '@/shared/models/project.model';
import { ConfirmationService } from '@/shared/component/confirmation-dialog/confirmation.service';

@Component({
  selector: 'app-manage-project',
  imports: [SHARED_PRIMENG],
  templateUrl: './manage-project.html',
  styleUrl: './manage-project.scss',
  providers: [ManageProjectService],
})
export class ManageProject {
  layout: 'list' | 'grid' = 'list';

  options = ['list', 'grid'];
  
  
  projectDialog: boolean = false;
  
  submitted: boolean = false;
  
  statuses!: any[];
  
  product: Partial<Project> = {};

  projects: any[] = [];
  companyId = 'Kew12bAspsjm1A0R2JBM'; 

  constructor(
    private manageProjectService: ManageProjectService,
    private confirmationService: ConfirmationService
  ) { }

  async ngOnInit() {

    this.loadDemoData();


    this.projects = await this.manageProjectService.loadProjects(this.companyId);
  }

  loadDemoData() {
    this.statuses = [
      { label: 'Pending', value: 'Pending' },
      { label: 'Process', value: 'Process' },
      { label: 'Complete', value: 'Complete' },
      { label: 'Cancel', value: 'Cancel' },
    ];
  }


  getSeverity(product: Project) {
    switch (product.status) {
      case 'Pending':
        return 'info';

      case 'Process':
        return 'warn';

      case 'Complete':
        return 'success';

      case 'Cancel':
        return 'danger';

      default:
        return 'info';
    }
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.projectDialog = true;
  }

  hideDialog() {
    this.projectDialog = false;
    this.submitted = false;
  }

  editProject(project: Project) {
    this.product = { ...project };
    this.submitted = false;
    this.projectDialog = true;
  }

  deleteProject(project: Project) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete project "${project.name_th}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await this.manageProjectService.deleteProject(this.companyId, project.id!);
          this.projects = await this.manageProjectService.loadProjects(this.companyId);
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      },
      reject: () => {
        console.log('Delete cancelled');
      }
    });
  }


  async saveProject() {
    this.submitted = true;

    if (!this.product.name_th?.trim() || !this.product.name_en?.trim() || !this.product.start_date || !this.product.end_date) {
      return;
    }

    try {
      if (this.product.id) {
        // Update
        await this.manageProjectService.updateProject(
          this.companyId,
          this.product.id,
          this.product
        );
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Updated',
        //   detail: 'Project updated successfully',
        //   life: 3000
        // });
      } else {
        // Create
        const newProject = {
          ...this.product,
          start_date: this.product.start_date,
          end_date: this.product.end_date,
        };

        await this.manageProjectService.addProject(this.companyId, newProject);
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Created',
        //   detail: 'Project created successfully',
        //   life: 3000
        // });
      }

      // refresh list
      this.projects = await this.manageProjectService.loadProjects(this.companyId);

      // close dialog
      this.projectDialog = false;
      this.product = {}; // reset form
    } catch (error) {
      console.error('Error saving project:', error);
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Could not save project',
    //     life: 3000
    //   });
    }
  }

}
