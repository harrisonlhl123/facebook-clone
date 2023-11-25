Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index]
    resources :posts, only: [:create, :destroy, :update, :index, :show]
    resources :comments, only: [:create, :destroy, :update, :index, :show]
    resources :friends, only: [:create, :destroy, :index]
    resources :likes, only: [:index, :show, :create, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
