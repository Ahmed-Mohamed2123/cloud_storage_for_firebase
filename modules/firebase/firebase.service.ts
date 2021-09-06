import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import * as firebaseAdmin from 'firebase-admin';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class FirebaseService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  private storageRef = firebaseAdmin
    .storage()
    .bucket('gs://storage-9c3d3.appspot.com');

  /**
   * @param path => image_path
   * @param pathFirebase
   */
  async uploadFile(path: string, pathFirebase: string) {
    const storage = await this.storageRef.upload(path, {
      public: true,
      destination: pathFirebase,
      metadata: {
        firebaseStorageDownloadTokens: uuid4(),
      },
    });

    return storage[0].metadata.mediaLink;
  }

  /**
   * @param path => image_path
   */
  async deleteFile(path) {
    const baseUrl =
      'https://storage.googleapis.com/download/storage/v1/b/storage-9c3d3.appspot.com/o/';

    let imagePath: string = path.replace(baseUrl, '');

    const indexOfEndPath = imagePath.indexOf('?');

    imagePath = imagePath.substring(0, indexOfEndPath);

    imagePath = imagePath.replace('%2F', '/');

    return await this.storageRef.file(imagePath).delete();
  }
}
