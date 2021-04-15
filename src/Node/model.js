import { Model } from '@nozbe/watermelondb';
import { field, children } from '@nozbe/watermelondb/decorators'

export class Node extends Model {
  @field('id')
  id

  @field('name')
  name

  @children('children')
  children
}