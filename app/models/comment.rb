class Comment < ApplicationRecord
    validates :body, :user_id, :post_id, presence: true

    belongs_to :user

    belongs_to :post

    has_many :likes, as: :likeable, dependent: :destroy
end