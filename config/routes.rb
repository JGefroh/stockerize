Rails.application.routes.draw do

  root 'application#index'
  resources :stock_prices, only: [:index]
  resources :stocks, only: [:show]
end
