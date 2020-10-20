class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :masqueradable, :database_authenticatable,
    :registerable, :recoverable, :rememberable,
    :validatable, :omniauthable, omniauth_providers: %i[twitter]

  has_one_attached :avatar
  has_person_name

  validates_uniqueness_of :email

  has_many :notifications, as: :recipient
  has_many :services
  has_many :channel_users, dependent: :destroy
  has_many :channels, through: :channel_users
  has_many :messages, dependent: :destroy

  def email_required?
     false
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.first_name = auth.info.name # assuming the user model has a name
      user.username = auth.info.nickname # assuming the user model has a username
      #user.image = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end
end
