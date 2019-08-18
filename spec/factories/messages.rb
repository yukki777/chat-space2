FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/vr_game_mother_boy.png")}
    user
    group
  end
end
