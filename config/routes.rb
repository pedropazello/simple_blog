Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :posts, only: :index
  namespace :api do
    resources :posts, only: [:index, :create], defaults: { format: :json }
  end
end
