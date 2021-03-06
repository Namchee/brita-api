import { EntitySchema } from 'typeorm';
import { Announcement } from './../../entity/announcement';

/**
 * TypeORM entity schema for Announcement entity
 */
export const AnnouncementEntity = new EntitySchema<Announcement>({
  name: 'announcement',
  tableName: 'announcement',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      nullable: false,
    },
    title: {
      type: String,
      unique: true,
      length: 50,
      nullable: false,
    },
    contents: {
      type: String,
      length: 300,
      nullable: false,
    },
    validUntil: {
      type: Date,
      name: 'valid_until',
      nullable: false,
    },
  },
  relations: {
    categories: {
      type: 'many-to-many',
      joinTable: {
        name: 'announcement_categories',
        joinColumn: {
          name: 'announcement_id',
        },
        inverseJoinColumn: {
          name: 'category_id',
        },
      },
      target: 'category',
    },
  },
});
