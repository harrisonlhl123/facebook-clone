class Post < ApplicationRecord
    validates :body, :author_id, presence: true
    
    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    has_many :comments,
        dependent: :destroy

    has_many :likes, as: :likeable, dependent: :destroy

    has_one_attached :photo
end