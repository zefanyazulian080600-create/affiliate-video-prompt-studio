import { PromptProject } from '@/types';
import { db, isFirebaseConfigured, auth } from '../firebase/client';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'affiliate_video_studio_projects';

/**
 * Gets all local projects from localStorage.
 */
function getLocalProjects(): PromptProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed reading from localStorage', e);
    return [];
  }
}

/**
 * Saves projects array to localStorage.
 */
function saveLocalProjects(projects: PromptProject[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed writing to localStorage', e);
  }
}

/**
 * Persists a project to Firestore (if configured & signed in) and localStorage.
 */
export async function saveProject(project: PromptProject): Promise<void> {
  // Always update local storage for instant offline resilience
  const localList = getLocalProjects();
  const existingIndex = localList.findIndex(p => p.id === project.id);
  if (existingIndex >= 0) {
    localList[existingIndex] = project;
  } else {
    localList.unshift(project);
  }
  saveLocalProjects(localList);

  // If Firebase is available and user is logged in, sync to Firestore
  if (isFirebaseConfigured && db && auth?.currentUser) {
    try {
      const projectRef = doc(db, 'projects', project.id);
      await setDoc(projectRef, {
        ...project,
        userId: auth.currentUser.uid,
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('[Firestore] Failed syncing to cloud, kept safely in localStorage:', e);
    }
  }
}

/**
 * Retrieves a project by ID.
 */
export async function getProject(id: string): Promise<PromptProject | null> {
  // Check cloud first if active
  if (isFirebaseConfigured && db && auth?.currentUser) {
    try {
      const docRef = doc(db, 'projects', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as PromptProject;
        // Verify ownership
        if (data.userId === auth.currentUser.uid) {
          return data;
        }
      }
    } catch (e) {
      console.warn('[Firestore] Read error, checking localStorage fallback:', e);
    }
  }

  // Fallback to local storage
  const localList = getLocalProjects();
  return localList.find(p => p.id === id) || null;
}

/**
 * Lists all projects for the current user.
 */
export async function listProjects(): Promise<PromptProject[]> {
  if (isFirebaseConfigured && db && auth?.currentUser) {
    try {
      const q = query(
        collection(db, 'projects'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('updatedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const cloudProjects: PromptProject[] = [];
      snapshot.forEach(docSnap => {
        cloudProjects.push(docSnap.data() as PromptProject);
      });
      if (cloudProjects.length > 0) return cloudProjects;
    } catch (e) {
      console.warn('[Firestore] Query error, falling back to localStorage list:', e);
    }
  }

  return getLocalProjects();
}

/**
 * Deletes a project by ID.
 */
export async function deleteProject(id: string): Promise<void> {
  const localList = getLocalProjects().filter(p => p.id !== id);
  saveLocalProjects(localList);

  if (isFirebaseConfigured && db && auth?.currentUser) {
    try {
      const docRef = doc(db, 'projects', id);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn('[Firestore] Delete error:', e);
    }
  }
}

/**
 * Duplicates a project.
 */
export async function duplicateProject(id: string): Promise<PromptProject | null> {
  const original = await getProject(id);
  if (!original) return null;

  const now = new Date().toISOString();
  const duplicate: PromptProject = {
    ...original,
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    projectName: `${original.projectName} (Duplikat)`,
    createdAt: now,
    updatedAt: now,
  };

  await saveProject(duplicate);
  return duplicate;
}
