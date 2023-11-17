class Friend < ApplicationRecord
    validates :user_id, :friend_id, presence: true
    validates_uniqueness_of :user_id, :scope => [:friend_id]

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
    
    belongs_to :friend,
        primary_key: :id,
        foreign_key: :friend_id,
        class_name: :User
end