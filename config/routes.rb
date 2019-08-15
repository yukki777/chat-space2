Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
      # 自動更新のためのルーティング
      # group_api_messages GET    /groups/:group_id/api/messages(.:format
    end
  end
  # resources :groups, only: [:new, :edit] do
  #   resources :users, only: :index
  # end
end
