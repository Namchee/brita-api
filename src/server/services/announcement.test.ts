import { AnnouncementRepositoryMock, announcements } from './test.util';
import { AnnouncementService } from './announcement';
import { PagingOptions } from '../repository/base';
import { UserError } from '../utils/error';

describe('Announcement REST service unit test', () => {
  const repository = new AnnouncementRepositoryMock();
  const service = new AnnouncementService(repository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'findAll');
    });

    it('should return all announcements', async () => {
      const result = await service.findAll();

      expect(result).toStrictEqual(announcements);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it(
      'should return announcements subset when supplied with parameters',
      async () => {
        const params: PagingOptions = {
          limit: 2,
          offset: 1,
        };

        const result = await service.findAll(params);

        expect(result).toStrictEqual(announcements.slice(1, 3));
        expect(repository.findAll).toHaveBeenCalledTimes(1);
        expect(repository.findAll).toHaveBeenCalledWith(params);
      });

    it('should throw an error when invalid parameters are supplied',
      async () => {
        const params: any = {
          limit: 'a string lol',
          offset: 1,
        };

        expect(service.findAll(params)).rejects.toBeInstanceOf(UserError);
        expect(repository.findAll).toHaveBeenCalledTimes(0);
      });
  });
});