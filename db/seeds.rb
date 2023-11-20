require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Post.destroy_all
    Friend.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    
    # More users
    10.times do
      User.create!(
        email: Faker::Internet.unique.email,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        birthday: Faker::Date.birthday(min_age: 18, max_age: 65),
        gender: ['Male', 'Female'].sample,
        password: 'password'
        )
      end

      User.first(10).each do |user|
        user.pfp.attach(
          # The string passed to URI.open should be the URL of the image in its bucket.
          # This sample assumes the bucket name is `benchbnb-seeds`.
          io: URI.open("https://instabook-seeds.s3.amazonaws.com/default.png"), 
          filename: "default.png"
        )
      end
      
      demoUser = User.create!(
          email: 'harrison@aa.io',
          first_name: 'Harrison',
          last_name: 'Liang',
          birthday: Date.new(2000, 1, 1),
          gender: 'Male',
          password: 'password'
      )
  
      demoUser.pfp.attach(io: URI.open("https://instabook-seeds.s3.amazonaws.com/cat.avif"), filename: "cat.avif")
  
      demoUser.cover.attach(io: URI.open("https://instabook-seeds.s3.amazonaws.com/kittens.jpg"), filename: "kittens.jpg")

    Post.create!(
      body: "First post on Facebook clone!",
      author_id: 1
    )

    Post.create!(
      body: "Happy Thanksgiving!",
      author_id: 2
    )

    catPost = Post.create!(
      body: "Look at this cat!",
      author_id: 2
    )

    catPost.photo.attach(io: URI.open("https://instabook-seeds.s3.amazonaws.com/cat.avif"), filename: "cat.avif")

 
    users = User.all

    users.each_with_index do |user, index|
      # Connect each user with the next user
      friend = users[(index + 1) % users.length]
    
      # Create friendships (initiator and receiver perspectives)
      Friend.create!(user: user, friend: friend)
      Friend.create!(user: friend, friend: user)
    end    
    
    puts "Done!"
  # end
