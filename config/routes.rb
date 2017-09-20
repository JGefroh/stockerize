Rails.application.routes.draw do

  root 'application#index'
  resources :stock_prices, only: [:index]
end
