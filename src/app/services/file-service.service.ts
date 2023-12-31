import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from './dtos/FileModel';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  uploadFiles(files: FileList, path: string): Promise<string[]> {
    const uploadPromises: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      const filePath = `${path}/${file?.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(file);

      uploadPromises.push(
        new Promise((resolve, reject) => {
          uploadTask
            .then((snapshot) => {
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                resolve(downloadURL);
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
      );
    }

    return Promise.all(uploadPromises);
  }

  deleteFolder(path: string): Promise<void> {
    const storageRef = this.storage.ref(path);
    // List all items in the folder
    return storageRef
      .listAll()
      .toPromise()
      .then((result: any) => {
        const deletePromises: Promise<void>[] = [];

        // Delete each item in the folder
        result.items.forEach((item: any) => {
          const deletePromise = item.delete();
          deletePromises.push(deletePromise);
        });

        // Wait for all items to be deleted
        return Promise.all(deletePromises);
      })
      .then(() => {
        // Delete the folder itself
        return storageRef.delete().toPromise();
      });
  }
}
