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

    bios = [
      "Connecting with friends and family. 🌟",
      "Exploring new interests and hobbies. 🚀",
      "Sharing moments that matter. ❤️",
      "Making memories and enjoying life. 🌈",
      "Meeting new people and building connections. 👋",
      "Expressing thoughts and opinions. 🗣️",
      "Loving every moment of this journey. 😊",
      "Dreaming big and achieving goals. 🌠",
      "Embracing the beauty of diversity. 🌍",
      "Spreading positivity and kindness. ✨"
    ]
    
    
    # More users
    10.times do
      User.create!(
        email: Faker::Internet.unique.email,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        birthday: Faker::Date.birthday(min_age: 18, max_age: 65),
        gender: ['Male', 'Female'].sample,
        password: 'password',
        bio: bios.sample
        )
      end

      User.first(10).each do |user|
        user.pfp.attach(
          # The string passed to URI.open should be the URL of the image in its bucket.
          # This sample assumes the bucket name is `benchbnb-seeds`.
          io: URI.open("https://instabook-seeds.s3.amazonaws.com/default.png"), 
          filename: "default.png"
        )

        user.cover.attach(
          io: URI.open("https://instabook-seeds.s3.amazonaws.com/cover-photo.jpeg"),
          filename: "cover-photo.jpeg"
        )
      end
      
      demoUser = User.create!(
          email: 'harrison@aa.io',
          first_name: 'Harrison',
          last_name: 'Liang',
          birthday: Date.new(2000, 1, 1),
          gender: 'Male',
          password: 'password',
          bio: "Creating something special here, one day at a time! 😌"
      )
  
      demoUser.pfp.attach(io: URI.open("https://instabook-seeds.s3.amazonaws.com/cat.avif"), filename: "cat.avif")
  
      demoUser.cover.attach(io: URI.open("https://instabook-seeds.s3.amazonaws.com/kittens.jpg"), filename: "kittens.jpg")

    Post.create!(
      body: "First post on Instabook!",
      author_id: 1,
      feed_id: 1
    )

    Post.create!(
      body: "Happy Thanksgiving!",
      author_id: 2,
      feed_id: 2
    )

    
    catPost = Post.create!(
      body: "Look at this cat!",
      author_id: 2,
      feed_id: 2
    )
      
    catPost.photo.attach(io: URI.open("https://instabook-seeds.s3.amazonaws.com/cat.avif"), filename: "cat.avif")
      
    Post.create!(
      body: "Happy Birthday!",
      author_id: 5,
      feed_id: 6
    )

    11.times do |index|
      Post.create!(
        body: "Random post #{index + 1} on Instabook!",
        author_id: index + 1,
        feed_id: index + 1
      )
    end  

    users = User.all

    users.each_with_index do |user, index|

      friend = users[(index + 1) % users.length]

      Friend.create!(user: user, friend: friend)
      Friend.create!(user: friend, friend: user)
    end

    demo_user = User.find_by(id: 11)

    users.each do |user|
      next if user == demo_user || demo_user.friends.include?(user)

      Friend.create!(user: demo_user, friend: user)
      Friend.create!(user: user, friend: demo_user)
    end

    
    
    Comment.create!(
      user_id: 3,
      post_id: 1,
      body: "First comment on Instabook!"
    )

    Comment.create!(
      user_id: 8,
      post_id: 2,
      body: "Merry Christmas!"
    )

    Comment.create!(
      user_id: 5,
      post_id: 3,
      body: "How old is he?"
    )
    
    puts "Done!"
  # end
