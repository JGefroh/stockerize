Rails.application.routes.draw do

  root 'application#index'
  scope '/api' do
    resources :stock_prices, only: [:index]
    resources :stocks, only: [:show]
  end
end
