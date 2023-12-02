class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.references :user, foreign_key: {to_table: :users}, null: false, index: true
      t.references :friend, foreign_key: {to_table: :users}, null: false, index: true

      t.timestamps
    end

    add_index :friends, [:user_id, :friend_id], name: 'index_friends_on_user_id_and_friend_id'
  end

end
