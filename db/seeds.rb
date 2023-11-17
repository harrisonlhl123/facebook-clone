# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
        email: 'demo@user.io',
        first_name: 'Demo',
        last_name: 'lition',
        birthday: Date.new(2000, 1, 1),
        gender: 'Male',
        password: 'password'
      )
      
  
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

    Post.create!(
      body: "First post on Facebook clone!",
      author_id: 1
    )

    Post.create!(
      body: "Happy Thanksgiving!",
      author_id: 2
    )


    users = User.all

    users.each_with_index do |user, index|
      # Connect each user with the next user
      friend = users[(index + 1) % users.length]
    
      # Create friendships (initiator and receiver perspectives)
      Friend.create!(user: user, friend: friend)
      Friend.create!(user: friend, friend: user)
    end    
    
    puts "Done!"
  end
