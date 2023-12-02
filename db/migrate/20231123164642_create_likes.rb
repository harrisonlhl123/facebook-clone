class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :user, foreign_key: true, null: false, index: { unique: true }
      t.references :likeable, polymorphic: true, null: false, index: true

      t.timestamps
    end

    remove_index :likes, name: 'index_likes_on_user_id', column: [:user_id]
    add_index :likes, [:user_id, :likeable_id, :likeable_type], unique: true
  end
end
