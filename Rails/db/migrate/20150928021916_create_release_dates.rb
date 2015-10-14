class CreateReleaseDates < ActiveRecord::Migration
  def change
    create_table :release_dates do |t|
      t.date "date"
      t.integer "game_id"
      t.integer "console_id"
      t.integer "region_id"
      t.timestamps
    end
  end
end
