import fs from 'fs';
import { Request, Response } from 'express';
import busboy from 'busboy';
import { StatusCodes } from 'http-status-codes';

import { createVideo } from './video.service';
import { Video } from './video.model';

const MIME_TYPES = ['video/mp4'];

function getPath({
  videoId,
  extension,
}: {
  videoId: Video['videoId'];
  extension: Video['extension'];
}) {
  return `${process.cwd()}/videos/${videoId}.${extension}`;
}

export async function uploadVideoHandler(
  req: Request,
  res: Response
) {
  const bb = busboy({ headers: req.headers });

  const user = res.locals.user;

  const video = await createVideo({ owner: user._id });

  bb.on('file', async (_, file, info) => {
    if (!MIME_TYPES.includes(info.mimeType)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid file type' });
    }

    const extension = info.mimeType.split('/')[1];

    const filePath = getPath({ videoId: video.videoId, extension });

    video.extension = extension;

    await video.save();

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on('close', () => {
    res.writeHead(StatusCodes.CREATED, {
      Connection: 'close',
      'Content-Type': 'application/json',
    });

    res.write(JSON.stringify(video));
    res.end();
  });

  return req.pipe(bb);
}
