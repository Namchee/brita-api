import {
  EntityRepository as BaseEntityRepository,
  EntityManager,
  Repository as BaseRepository,
} from 'typeorm';
import { Announcement } from './../entity/announcement';
import { TypeORMRepository, EntityRepository, PagingOptions } from './base';
import { Category } from './../entity/category';
import { AnnouncementEntity } from './../database/model/announcement';

interface FindAnnouncementOptions extends PagingOptions {
  limit: number;
  offset: number;
  validUntil?: Date;
}

/**
 * Interface for Announcement repository
 *
 * Any concrete Announcement repository implementation MUST
 * implement this interface (including mocked one)
 */
export interface AnnouncementRepository
  extends EntityRepository<Announcement> {
  /**
    * Get an announcement by its identifier from the data source
    *
    * @param {number} ID Identifier of the announcement
    * @return {Promise<Announcement | null>} Announcement entity if found,
    * `null` otherwise
    */
  findById(id: number): Promise<Announcement | null>;
  /**
   * Get all Announcement which satisfies the requested category
   *
   * @param {Category} category Requested category identfier
   * @param {FindAnnouncementOptions=} options Options for pagination purposes
   * @return {Announcement[]} Array of announcements
   */
  findByCategory(
    category: number,
    options?: FindAnnouncementOptions,
  ): Promise<Announcement[]>;
  /**
   * Creates a new Announcement and save it in the database
   *
   * @param {string} title Announcement's title
   * @param {string} content Announcement's content
   * @param {Date} date Announcement's date
   * @param {Category[]} categories Announcement's categories
   * @return {Promise<Announcement>} The newly created Announcement
   * or `null` if duplicate properties exists
   */
  create(
    title: string,
    content: string,
    date: Date,
    categories: Category[],
  ): Promise<Announcement | null>;
  batchDelete(ids: number[]): Promise<boolean>;
}

/**
 * Announcement repository implemented with typeorm
 *
 * It abstracts database access for Announcements from complex queries
 */
@BaseEntityRepository(AnnouncementEntity)
export class AnnouncementRepositoryTypeORM
  extends TypeORMRepository<Announcement>
  implements AnnouncementRepository {
  public constructor(manager: EntityManager) {
    super(manager);
  }

  protected get repository(): BaseRepository<Announcement> {
    return this.manager.getRepository(AnnouncementEntity);
  }

  /**
   * Get all announcement from the database
   *
   * @return {Promise<Announcement[]>} Announcement array
   */
  public findAll = async (
    options?: FindAnnouncementOptions,
  ): Promise<Announcement[]> => {
    let query = this.repository
      .createQueryBuilder('announcement')
      .innerJoinAndSelect(
        'announcement.categories',
        'categories',
      )
      .select([
        'announcement.id',
        'announcement.title',
        'announcement.contents',
        'announcement.validUntil',
        'categories.id',
        'categories.name',
      ])
      .limit(options?.limit)
      .offset(options?.offset);

    if (options?.validUntil) {
      query = query.where(
        'announcement.valid_until >= :dateNow',
        { dateNow: options.validUntil },
      );
    }

    return query.getMany();
  }

  public findById = async (id: number): Promise<Announcement | null> => {
    return await this.repository.createQueryBuilder('announcement')
      .select([
        'announcement.id',
        'announcement.title',
        'announcement.contents',
        'announcement.validUntil',
      ])
      .where('announcement.id = :id', { id })
      .getOne() || null;
  }

  /**
   * Get all announcements which satisfies the requested category
   *
   * @param {Category} category Requested category's identifier
   * @param {FindAnnouncementOptions=} options Find announcement options
   * @return {Promise<Announcement[]>} Announcement array, which
   * satisfies the requested category
   */
  public findByCategory = async (
    category: number,
    options?: FindAnnouncementOptions,
  ): Promise<Announcement[]> => {
    let query = this.repository
      .createQueryBuilder('announcement')
      .innerJoin(
        'announcement.categories',
        'categories',
        'categories.id = :id', { id: category })
      .select([
        'announcement.title',
        'announcement.contents',
        'announcement.validUntil',
      ])
      .limit(options?.limit)
      .offset(options?.offset);

    if (options?.validUntil) {
      query = query.where(
        'announcement.valid_until >= :dateNow',
        { dateNow: options.validUntil },
      );
    }

    return query.getMany();
  }

  /**
   * Creates a new Announcement and save it in the database
   *
   * @param {string} title Announcement's title
   * @param {string} contents Announcement's contents
   * @param {Date} validUntil Announcement's date
   * @param {Category[]} categories Announcement's categories
   * @return {Promise<Announcement>} The newly created Announcement
   * or `null` if duplicate property exists
   */
  public create = async (
    title: string,
    contents: string,
    validUntil: Date,
    categories: Category[],
  ): Promise<Announcement | null> => {
    try {
      const insertResult = await this.repository.insert({
        title,
        contents,
        validUntil,
        categories,
      });

      return (insertResult.generatedMaps[0]) as Announcement;
    } catch (err) {
      return null; // hopefully, dupes issues
    }
  }

  /**
   * Deletes an announcement from the database
   *
   * @param {number} id ID of target announcement
   * @return {Promise<boolean>} `true` if deletion is successful,
   * `false` otherwise
   */
  public delete = async (id: number): Promise<boolean> => {
    const deleteResult = await this.repository.delete(id);

    return !!deleteResult.affected;
  }

  /**
   * Updates an announcement with given arguments
   *
   * @param {Announcement} obj Announcement object
   * @return {Promise<boolean>} `true` if update is successful,
   * `false` otherwise
   */
  public update = async (
    {
      id,
      title,
      contents,
      validUntil,
      categories,
    }: Announcement,
  ): Promise<boolean> => {
    const updateResult = await this.repository.update(
      id,
      {
        title,
        contents,
        validUntil,
        categories,
      },
    );

    return !!updateResult.affected;
  }

  public batchDelete = async (ids: number[]): Promise<boolean> => {
    return this.manager.transaction(async (manager): Promise<boolean> => {
      const repository = manager.getRepository(AnnouncementEntity);

      try {
        await Promise.all(ids.map(id => repository.delete(id)));

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    });
  }
}
