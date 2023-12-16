class AddFeedId < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :feed_id, :bigint, foreign_key: { to_table: :users }, null: false
    add_index :posts, :feed_id
  end
end
