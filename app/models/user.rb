class User < ApplicationRecord
    has_secure_password

    validates :email, 
        uniqueness: true, 
        length: { in: 3..255 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true
    validates :first_name, :last_name, :birthday, :email, :gender, presence: true

    before_validation :ensure_session_token

    has_one_attached :pfp
    has_one_attached :cover

    has_many :posts,
        dependent: :destroy
    
    has_many :initiated_friendships,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Friend,
        dependent: :destroy

    has_many :received_friendships,
        primary_key: :id,
        foreign_key: :friend_id,
        class_name: :Friend,
        dependent: :destroy

    has_many :friends,
        through: :initiated_friendships,
        source: :friend

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user&.authenticate(password)
    end
    
    def reset_session_token!
        self.update!(session_token: generate_unique_session_token)
        self.session_token
    end

    private

    def generate_unique_session_token
        loop do
            token = SecureRandom.base64
            break token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end