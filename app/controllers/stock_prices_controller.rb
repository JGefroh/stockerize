class StockPricesController < ApplicationController
  def index
    @stock_prices = StockPrice.all.limit(100)
    render json: @stock_prices, root: false
  end
end
