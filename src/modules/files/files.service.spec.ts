import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

import { v2 as cloudinary } from 'cloudinary';

describe('FilesService', () => {
  let service: FilesService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mock-value'),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FilesService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = moduleRef.get(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upload', () => {
    it('should throw BadRequestException when no file provided', async () => {
      await expect(service.upload(null as any)).rejects.toThrow(BadRequestException);
      await expect(service.upload(undefined as any)).rejects.toThrow(BadRequestException);
    });

    it('should upload file and return url, publicId, originalName, size', async () => {
      const mockStream = { end: jest.fn() };
      const mockResult = {
        secure_url: 'https://res.cloudinary.com/demo/image/upload/v1/test.jpg',
        public_id: 'test.jpg',
      };

      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_options: any, callback: any) => {
          callback(null, mockResult);
          return mockStream;
        },
      );

      const file = {
        originalname: 'photo.jpg',
        buffer: Buffer.from('fake-image-data'),
        size: 1024,
      } as Express.Multer.File;

      const result = await service.upload(file);
      expect(result.url).toBe(mockResult.secure_url);
      expect(result.publicId).toBe(mockResult.public_id);
      expect(result.originalName).toBe('photo.jpg');
      expect(result.size).toBe(1024);
      expect(mockStream.end).toHaveBeenCalledWith(file.buffer);
    });

    it('should reject when cloudinary returns error', async () => {
      const mockStream = { end: jest.fn() };

      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (_options: any, callback: any) => {
          callback(new Error('Upload failed'), null);
          return mockStream;
        },
      );

      const file = {
        originalname: 'photo.jpg',
        buffer: Buffer.from('fake-image-data'),
        size: 1024,
      } as Express.Multer.File;

      await expect(service.upload(file)).rejects.toThrow('Upload failed');
    });
  });
});
