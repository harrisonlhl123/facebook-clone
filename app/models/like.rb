class Like < ApplicationRecord
    validates :user_id,:likeable_type,:likeable_id,presence: true 
    belongs_to :likeable, :polymorphic => true 
    belongs_to :user 
end