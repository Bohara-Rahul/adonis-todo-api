import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('addedBy').unsigned().references('users.id');
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('addedBy');
    })
  }
}
