import { EntityManager, Repository as BaseRepository } from 'typeorm';
import { Entity } from './../entity/base';

/**
 * An object which represents pagination details for `find` methods
 *
 * Useful in bot environment, but can also be used in REST context
 */
export interface PagingOptions {
  /**
   * Limits the number of entities returned
   */
  limit?: number;
  /**
   * Overrides default start value when finding entities
   */
  offset?: number;
}

/**
 * Base typeORM repository class.
 * Every repository which depends on typeORM must extend this class.
 *
 * Remember to decorate it with `EntityRepository`, otherwise it will be
 * unrecognizable by typeORM
 */
export abstract class TypeORMRepository<T extends Entity> {
  protected readonly manager: EntityManager;

  /**
   * Constructor for typeORM repository.
   *
   * @param {EntityManager} manager Entity manager
   */
  public constructor(manager: EntityManager) {
    this.manager = manager;
  }

  /**
   * Get the default typeORM entity repository for this entity
   *
   * @return {BaseRepository<T>} Default typeORM entity repository
   */
  protected abstract get repository(): BaseRepository<T>;
}

/**
 * An interface for Repository
 *
 * It describes basic contract for all Repository implementation
 *
 * Implement this for concrete implementation
 */
export interface Repository<T extends Entity> {
  /**
   * Deletes an Entity from the database
   *
   * @param {number | string} id Entity's identifier
   * @return {Promise<boolean>} `true` if the entity exists and
   * the deletion is successful, `false` otherwise
   */
  delete(id: number | string): Promise<boolean>;
  /**
   * Updates an Entity in the database with new data
   *
   * @param {T} obj The updated Entity
   * @return {Promise<boolean>} `true` if the entity exists
   * and successfully updated, `false` otherwise.
   *
   * Please refer the constraint to each repository's model
   */
  update(obj: T): Promise<boolean>;
}

/**
 * Entity repository interface
 *
 * It adds `findAll` method for business entity (non-application entity)
 */
export interface EntityRepository<T extends Entity> extends Repository<T> {
  /**
   * Get all Entity from the database
   *
   * @param {PagingOptions=} options Pagination options to limit
   * the amount of entities returned
   * @return {Promise<T[]>} Entity array
   */
  findAll(options?: PagingOptions): Promise<T[]>;
}
