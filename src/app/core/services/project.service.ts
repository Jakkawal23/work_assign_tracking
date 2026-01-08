import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { 
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc 
} from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private firebase: FirebaseService) {}

  async getProjects(companyId: string) {
    const ref = collection(this.firebase.db, `companies/${companyId}/projects`);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async getProject(companyId: string, projectId: string) {
    const ref = doc(this.firebase.db, `companies/${companyId}/projects/${projectId}`);
    const snap = await getDoc(ref);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }

  async addProject(companyId: string, data: any) {
    const ref = collection(this.firebase.db, `companies/${companyId}/projects`);
    return await addDoc(ref, data);
  }

  async updateProject(companyId: string, projectId: string, data: any) {
    const ref = doc(this.firebase.db, `companies/${companyId}/projects/${projectId}`);
    return await updateDoc(ref, data);
  }

  async deleteProject(companyId: string, projectId: string) {
    const ref = doc(this.firebase.db, `companies/${companyId}/projects/${projectId}`);
    return await deleteDoc(ref);
  }
}