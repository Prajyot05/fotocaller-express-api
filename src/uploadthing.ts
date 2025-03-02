import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  mediaUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  })
    // .middleware(async ({user}) => {
    //   // This code runs on your server before upload
    //   console.log("User in middleware: ", user);
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");

    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.$id };
    // })
    .onUploadComplete(({ file, metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId);
      console.log("file url: ", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      // return { uploadedBy: metadata.userId };
    }),
  avatarUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(({ file, metadata }) => {
    console.log("file url: ", file.ufsUrl);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
