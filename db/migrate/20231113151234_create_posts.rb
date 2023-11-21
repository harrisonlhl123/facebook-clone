class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :body, null: false
      t.references :author, foreign_key: { to_table: :users }, index: true, null: false

      t.timestamps
    end
  end
end
