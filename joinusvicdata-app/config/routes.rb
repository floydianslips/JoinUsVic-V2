Rails.application.routes.draw do
  scope '/api' do
    resources :locations, only: [:index, :show]
    resources :keywords
    resources :funfacts
    resources :ratings
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end