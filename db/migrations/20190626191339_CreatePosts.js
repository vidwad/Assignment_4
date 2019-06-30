exports.up = function(knex, Promise) {
    return knex.schema.createTable("cohorts", t => {
      t.bigIncrements("id");
      t.string("cname");
      t.string("logo_url");
      t.text("members");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("cohorts");
  };